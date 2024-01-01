import { createContext, useContext } from 'react';

const auth = createContext<{
  handleLogin: (email: string, password: string) => void;
  isLogin: boolean;
}>({
  handleLogin: () => {},
  isLogin: false,
});

const useAuth = () => useContext(auth);

export { auth, useAuth };
