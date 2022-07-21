import * as AuthSession from 'expo-auth-session';

import React, { ReactNode, createContext, useContext, useState } from 'react';

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

interface AuthorizationResponse {
  params: {
    access_token: string
  },
  type: string
}

const CLIENT_ID = '142125773230-eqd35jdifusi5tqmb7f8mq0q33g8396a.apps.googleusercontent.com';
const REDIRECT_URI = 'https://auth.expo.io/@mateuslopes92/financesapp';
const RESPONSE_TYPE = 'token';
const SCOPE = encodeURI('profile email');
const AUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();

  const signInWithGoogle = async () => {
    try {
      const { params: { access_token }, type } = await AuthSession.startAsync({ authUrl: AUTH_URL }) as AuthorizationResponse;

      if(type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture
        });
      }
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