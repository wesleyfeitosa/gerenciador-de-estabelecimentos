/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import GlobalContext from './src/hooks';
import Routes from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#00bfa6" />
      <GlobalContext>
        <Routes />
      </GlobalContext>
    </NavigationContainer>
  );
};

export default App;
