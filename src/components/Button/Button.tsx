import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface ButtonProps {
    title: string;
    onPress?: () => void;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({title, onPress, color = '#fff'}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={[styles.text, {color}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    text: {
        textAlign: 'center',
        padding: 10,
        fontSize: 18
    }
})

export default Button
