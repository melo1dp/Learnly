// Fetch wrapper. Attaches the JWT from secure storage and parses JSON.
//
// Unlike the old web client there is no dev proxy, so requests need an absolute
// URL. In development we point at whatever machine is serving the JS bundle (the
// device already reaches it, so the API on the same host is reachable too); a
// release build must supply EXPO_PUBLIC_API_URL.
import Constants from "expo-constants";
import { NativeModules, Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "learnly_token";
const API_PORT = 4000;

/** Host of the Metro / Expo dev server, e.g. "192.168.1.5" or "localhost". */
function devHost() {
  // Browser: same machine as the Vite/Expo web server → hit the API on localhost.
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.location.hostname || "localhost";
  }

  // scriptURL ("http://192.168.1.5:8081/index.bundle?...") is the most reliable
  // source: it's how the bundle actually got here. Constants.expoConfig.hostUri
  // is a fallback — it isn't always populated yet at first import.
  const scriptUrl = NativeModules.SourceCode?.getConstants?.().scriptURL;
  const fromScript = scriptUrl?.match(/^https?:\/\/([^:/]+)/)?.[1];
  if (fromScript) return fromScript;

  return Constants.expoConfig?.hostUri?.split(":")[0] ?? null;
}

let cached;

/**
 * Resolved lazily, not at import time: throwing while the module graph is being
 * evaluated takes down every screen that imports this file.
 */
export function apiBaseUrl() {
  if (cached) return cached;

  // An explicit URL always wins, in development *and* in production. This was
  // previously gated behind `__DEV__ && explicit`, which meant a release build
  // silently ignored EXPO_PUBLIC_API_URL and always used the hardcoded fallback
  // below — the opposite of what this file's header and the README both claim,
  // and impossible to notice without reading the condition.
  const explicit = process.env.EXPO_PUBLIC_API_URL;
  if (explicit) {
    cached = explicit.replace(/\/$/, "");
    return cached;
  }

  if (__DEV__) {
    const host = Platform.OS === "web" ? "localhost" : devHost();
    if (host) {
      cached = `http://${host}:${API_PORT}`;
      return cached;
    }
  }

  // Last resort, so a build with no configuration still reaches a live API
  // rather than failing at startup. Deployments should set EXPO_PUBLIC_API_URL
  // instead of relying on this — see render.yaml.
  cached = "https://unilearnly.onrender.com";
  return cached;
}

/** SecureStore has limited web support — fall back to localStorage in the browser. */
async function storageGet(key) {
  if (Platform.OS === "web") {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  return SecureStore.getItemAsync(key);
}

async function storageSet(key, value) {
  if (Platform.OS === "web") {
    try {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {
      /* private browsing / blocked storage */
    }
    return;
  }
  if (value) return SecureStore.setItemAsync(key, value);
  return SecureStore.deleteItemAsync(key);
}

export function getToken() {
  return storageGet(TOKEN_KEY);
}

export function setToken(token) {
  return storageSet(TOKEN_KEY, token);
}

/** A request that reached the server and came back with a non-2xx status. */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * A request that never got an answer — offline, backend down, DNS, timeout.
 * Distinct from ApiError because the two want different handling: a network
 * failure is worth retrying and must never be read as "your token is bad".
 */
export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

// Without a timeout a stalled connection leaves the screen on its spinner
// forever — the request neither resolves nor rejects.
const REQUEST_TIMEOUT_MS = 15_000;

// 401 on these means "the credentials you just typed are wrong", not "your
// session has expired" — logging the user out over a typo would be absurd.
const CREDENTIAL_PATHS = ["/auth/login", "/auth/register", "/auth/password"];

let onUnauthorized = null;

/** Registered by the auth provider so an expired token logs out app-wide. */
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

export async function api(path, { method = "GET", body } = {}) {
  const baseUrl = apiBaseUrl();

  const headers = { "Content-Type": "application/json" };
  const token = await getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res;
  try {
    res = await fetch(`${baseUrl}/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch {
    // The base URL is useful while developing and meaningless to a real user,
    // so it only appears in dev builds.
    if (controller.signal.aborted) {
      throw new NetworkError(
        "The server is taking too long to respond. Check your connection and try again.",
      );
    }
    throw new NetworkError(
      __DEV__
        ? `Can't reach the Learnly backend at ${baseUrl}. Is it running?`
        : "No connection. Check your internet and try again.",
    );
  } finally {
    clearTimeout(timer);
  }

  let data = {};
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }

  if (!res.ok) {
    if (res.status === 401 && !CREDENTIAL_PATHS.includes(path)) {
      onUnauthorized?.();
      throw new ApiError("Your session has expired. Please sign in again.", 401);
    }
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status);
  }

  return data;
}
