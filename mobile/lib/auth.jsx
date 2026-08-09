import { createContext, useContext, useEffect, useState } from 'react';
import { api, getToken, setToken } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first launch, if a token survived in secure storage, ask the backend who we are.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const data = await api('/auth/me');
        if (!cancelled) setUser(data.user);
      } catch {
        // Expired/invalid token, or the backend is unreachable — start logged out.
        await setToken(null);
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
    setUser(data.user);
  }

  async function register(name, email, password, role) {
    const data = await api('/auth/register', {
      method: 'POST',
      body: { name, email, password, role },
    });
    await setToken(data.token);
    setUser(data.user);
  }

  async function logout() {
    await setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
