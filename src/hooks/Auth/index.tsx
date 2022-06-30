import React, { ReactNode, createContext, useContext } from 'react';

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string,
  name: string,
  email: string,
  photo?: string
}

interface AuthContextData {
  user: User,
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: '123',
    name: 'Mateus Lopes',
    email: 'mateuslopes92@gmail.com'
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth
}