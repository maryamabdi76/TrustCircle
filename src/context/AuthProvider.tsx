'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, ReactNode, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
