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

export async function api(path, { method = "GET", body } = {}) {
  const baseUrl = apiBaseUrl();

  const headers = { "Content-Type": "application/json" };
  const token = await getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${baseUrl}/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // A dead backend surfaces as a bare "Network request failed" on device,
    // which tells the user nothing. Say where we were actually trying to go.
    throw new Error(
      `Can't reach the Learnly backend at ${baseUrl}. Is it running?`,
    );
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
    const errorMessage = data.error || `Request failed (${res.status})`;
    throw new Error(errorMessage);
  }

  return data;
}
