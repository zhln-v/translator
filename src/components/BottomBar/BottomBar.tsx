import React from "react"
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"

// ({focused, color, size}) => <Icon name="translate" color={'#fff'} size={20} />

interface BottomBarIconProps {
    focused: boolean;
    color: string;
    size: number;
    name: string;
}

export const BottomBarIcon: React.FC<BottomBarIconProps> = ({focused, color, size, name}) => {
    return (
        <Icon name={name}
        size={
            focused ? size + 5 : size
        }
        color={
            focused ? color : color + 'a'
        }/>
    )
}