import React from 'react'
import { View } from 'react-native'
import Header from './Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Translate from '@/screens/Translate';
import { ThemeProvider } from '@/Theme/ThemeProvider';
import AppNavigator from './AppNavigator';



const index = () => {
    return (
        <ThemeProvider>
            <AppNavigator />
        </ThemeProvider>
    )
}

export default index
