import * as AuthSession from 'expo-auth-session';
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';

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
  isLoading: boolean,
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string
  },
  type: string
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const RESPONSE_TYPE = 'token';
const SCOPE = encodeURI('profile email');
const AUTH_URL =
  `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
const STORAGE_USER_KEY = '@financesapp:user';

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signInWithGoogle = async () => {
    try {
      const { params: { access_token }, type } = await AuthSession.startAsync({ authUrl: AUTH_URL }) as AuthorizationResponse;
      if(type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
          );
          
        const userInfo = await response.json();

        const userLogged = {
          id: String(userInfo.id),
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture
        }

        setUser(userLogged);
        await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userLogged))
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if(credential){
        const userLogged = {
          id: String(credential.user),
          name: String(credential.fullName!.givenName!),
          email: credential.email!,
          photo: `https://ui-avatars.com/api/?name=${String(credential.fullName!.givenName!)}&length=1`
        };

        setUser(userLogged)
        await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userLogged))
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(STORAGE_USER_KEY);
  }

  useEffect(()=> {
    (async () => {
      const userDataStoraged = await AsyncStorage.getItem(STORAGE_USER_KEY);

      if(userDataStoraged){
        const userLogged = JSON.parse(userDataStoraged) as User;

        setUser(userLogged);
      }

      setIsLoading(false);
    })()
  },[])

  return (
    <AuthContext.Provider value={{
        user,
        isLoading,
        signInWithGoogle,
        signInWithApple,
        signOut
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