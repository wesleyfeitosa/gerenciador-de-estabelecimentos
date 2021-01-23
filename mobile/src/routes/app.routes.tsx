import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home, { EstablishmentData } from '../pages/Home';
import CreateEstablishment from '../pages/CreateEstablishment';
import EditEstablishment from '../pages/EditEstablishment';

export type RootStackParamList = {
  Home: undefined;
  CreateEstablishment: undefined;
  EditEstablishment: { establishment: EstablishmentData };
};

const Stack = createStackNavigator<RootStackParamList>();

function AppRoutes() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          paddingTop: 0,
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
