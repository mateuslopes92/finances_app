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
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './src/routes/app.routes';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style='light' />
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App