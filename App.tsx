import 'intl';
import 'intl/locale-data/jsonp/en-US';
import 'react-native-gesture-handler';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/hooks/Auth';
import React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { useAuth } from './src/hooks/Auth';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  const { isLoading } = useAuth();

  if (!fontsLoaded || isLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar style='light' />
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
};

export default App