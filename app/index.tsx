import React, { useState } from 'react';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';
import Header from './Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Translate from '@/screens/Translate';
import { ThemeProvider } from '@/Theme/ThemeProvider';
import AppNavigator from './AppNavigator';
import Settings from './Settings';

const Index = () => {
    return (
        <ThemeProvider>
            <AppNavigator />

            <Settings />
        </ThemeProvider>
    );
};

export default Index;
