import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import CreateEstablishment from '../pages/CreateEstablishment';
import EditEstablishment from '../pages/EditEstablishment';

export type RootStackParamList = {
  Home: undefined;
  CreateEstablishment: undefined;
  EditEstablishment: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppRoutes() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          paddingTop: StatusBar.currentHeight,
        },
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CreateEstablishment"
        component={CreateEstablishment}
      />
      <Stack.Screen name="EditEstablishment" component={EditEstablishment} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
