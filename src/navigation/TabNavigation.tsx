import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home';
import { BottomBarIcon } from '../components/BottomBar/BottomBar';
import Header from './Header';
import Bookmarks from '../screens/Bookmarks';

const Tab = createBottomTabNavigator();

const getTabBarLabelStyle = (props: { focused: boolean }) => {
    return {
      color: props.focused ? 'red' : 'blue',  // Пример изменения цвета в зависимости от того, активна ли вкладка
      fontWeight: 'bold',
    };
  };

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: {backgroundColor: '#9370DB'}}}>
        <Tab.Screen name="Home" component={ Home } options={{
            tabBarIcon: (props) => <BottomBarIcon {...props} name="translate" color="#fff" />,
            tabBarLabel: 'Перевести',
            tabBarLabelStyle: {
                fontSize: 14,
                color: '#fff'
            },
            header: (props) => <Header {...props} />
        }} />
        <Tab.Screen name="Bookmarks" component={ Bookmarks } options={{
            tabBarIcon: (props) => <BottomBarIcon {...props} name="bookmark-outline" color='#fff' />,
            tabBarLabel: 'Закладки',
            tabBarLabelStyle: {
                fontSize: 14,
                color: '#fff'
            },
            header: (props) => <Header {...props} />
        }} />
    </Tab.Navigator>
  )
}

export default TabNavigation
