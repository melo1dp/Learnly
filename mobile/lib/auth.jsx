import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ApiError, api, getToken, setToken, setUnauthorizedHandler } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Set when the backend rejects a stored token mid-session, so the login
  // screen can explain why the user is suddenly looking at it.
  const [sessionExpired, setSessionExpired] = useState(false);

  const logout = useCallback(async () => {
    await setToken(null);
    setUser(null);
  }, []);

  // An expired token can surface on any screen, not just at launch. Without
  // this, every screen rendered its auth error and the user — with `user` still
  // set, so no redirect, and Profile itself erroring, so no reachable Log out —
  // had to force-quit the app.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setSessionExpired(true);
      logout();
    });
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  // On first launch, if a token survived in secure storage, ask the backend who we are.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const data = await api('/auth/me');
        if (!cancelled) setUser(data.user);
      } catch (err) {
        // Only a rejection from the server means the token is bad. A bare
        // `catch` also swallowed "backend unreachable", so cold-starting on a
        // flaky connection silently destroyed a perfectly valid session and
        // forced a full re-login.
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          await setToken(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email, password) {
    const data = await api('/auth/login', { method: 'POST', body: { email, password } });
    await setToken(data.token);
    setSessionExpired(false);
    setUser(data.user);
  }

  async function register(name, email, password) {
    // `role` is intentionally not sent. The API ignores it — accepting a
    // client-supplied role let anyone register as an instructor.
    const data = await api('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    await setToken(data.token);
    setSessionExpired(false);
    setUser(data.user);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, sessionExpired, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
