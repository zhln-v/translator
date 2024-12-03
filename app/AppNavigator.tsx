import Translate from '@/screens/Translate';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { StatusBar, View } from 'react-native';
import Header from './Header';
import { useTheme } from '@/Theme/ThemeProvider';
import Bookmarks from '@/screens/Bookmarks';

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
    const {theme} = useTheme();

    return (
        <>
            <StatusBar backgroundColor={theme.headerColor} />

            <Tab.Navigator initialRouteName='Translate' screenOptions={{
                header: (props) => ( <Header options={props.options} /> ),
                tabBarStyle: {backgroundColor: theme.headerColor, height: 60},
            }}>
                <Tab.Screen name="Translate" component={Translate} options={{
                    tabBarLabel: 'Переводчик',
                    title: 'Переводчик',
                    tabBarLabelStyle: {fontSize: 14},
                    tabBarIcon: () => (<MaterialIcons name="translate" size={24} color={theme.textColor} />),
                    tabBarActiveTintColor: theme.activeTabColor,
                }} />
                <Tab.Screen name="Bookmarks" component={Bookmarks} options={{
                    tabBarLabel: 'Закладки',
                    title: 'Закладки',
                    tabBarLabelStyle: {fontSize: 14},
                    tabBarIcon: () => (<MaterialIcons name="bookmark-border" size={24} color={theme.textColor} />),
                    tabBarActiveTintColor: theme.activeTabColor,
                }} />
            </Tab.Navigator>
        </>
    )
}

export default AppNavigator
