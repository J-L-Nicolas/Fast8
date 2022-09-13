import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import views
import HomeScreen from '../views/Home'
import MenuScreen  from '../views/Menu'

const Routes = () => {
    
    //init stack
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes