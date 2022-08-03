import React from 'react';
import { useAuth } from '../hooks/Auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { NavigationContainer } from '@react-navigation/native';

const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
       {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export default Routes;