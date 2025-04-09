import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../generalComponent/splash/Splash';
import GeneralContainer from '../generalComponent/GeneralContainer';



const Stack = createStackNavigator();

export function CoinsStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="GeneralContainer" component={GeneralContainer} />

        </Stack.Navigator>

    );
}


export default CoinsStack;