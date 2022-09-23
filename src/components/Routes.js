import React from 'react'
import { NativeModules, Appearance } from 'react-native'
import {useStoreActions} from 'easy-peasy'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import views
import HomeScreen from '../views/Home'
import MenuScreen  from '../views/Menu'
import GameScreen from '../views/Game'

const Routes = () => {

    // init store
    const selectLang = useStoreActions((actions) => actions.selectLang);
    const changeColorsMode = useStoreActions((action) => action.changeColorsMode)

    // read lang system
    const localeLang = NativeModules.I18nManager.localeIdentifier 
    selectLang(localeLang)

    // read color mode
    changeColorsMode(Appearance.getColorScheme())
    
    //init stack
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes