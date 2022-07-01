import * as AuthSession from 'expo-auth-session';

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
  signInWithGoogle: () => Promise<void>;
}

const CLIENT_ID = '887599574594-4k2f5rsmrbp4nim0u423poql648jnqrf.apps.googleusercontent.com';
const REDIRECT_URI = 'https://auth.expo.io/@mateuslopes92/finances_app';
const RESPONSE_TYPE = 'token';
const SCOPE = encodeURI('profile email');
const AUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: '123',
    name: 'Mateus Lopes',
    email: 'mateuslopes92@gmail.com'
  };

  const signInWithGoogle = async () => {
    try {
      const response = await AuthSession.startAsync({ authUrl: AUTH_URL });

      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{
        user,
        signInWithGoogle
      }}
    >
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