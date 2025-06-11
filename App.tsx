import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import theme from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={theme.colors.primary} />
          <RootNavigation />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}