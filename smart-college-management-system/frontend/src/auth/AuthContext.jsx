import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './apiClient';
import { jwtDecodeSafe } from '../utils/jwt.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const decoded = jwtDecodeSafe(token);
    if (decoded?.role) setUser({ role: decoded.role, userId: decoded.userId });
    setLoading(false);
  }, []);

  const value = useMemo(() => ({ user, setUser, loading, api }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

