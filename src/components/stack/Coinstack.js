import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../generalComponent/splash/Splash';
import GeneralContainer from '../generalComponent/GeneralContainer';
import PerfilUno from '../views/usuarios/perfilUno/PerfilUno';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="GeneralContainer" component={GeneralContainer} />
      <Stack.Screen name="PerfilUno" component={PerfilUno} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
