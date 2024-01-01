'use client';

import { ReactNode, useCallback, useState } from 'react';
import { auth } from '@/contexts/auth.context';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = useCallback((email: string, password: string) => {
    console.log(email, password);
  }, []);
  return (
    <auth.Provider value={{ handleLogin, isLogin }}>{children}</auth.Provider>
  );
};

export default AuthProvider;
