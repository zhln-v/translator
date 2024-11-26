import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import THEME from '../../theme/theme';
import { useAppSettings } from '../../theme/ThemeProvider';

interface ButtonProps {
    title: string;
    onPress?: () => void;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({title, onPress, color}) => {
    const {appTheme, fontSize} = useAppSettings();
    color = color ? THEME[appTheme].color : color;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={[styles.text, {color, fontSize}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    text: {
        textAlign: 'center',
        padding: 10,
        // fontSize: 18
    }
})

export default Button
