import React from 'react'
import { StyleSheet, View } from 'react-native'
import THEME from '../../theme/theme'

interface ButtonsArrayProps {
    children?: React.ReactNode
}

const theme = THEME['purple'];

const ButtonsArray: React.FC<ButtonsArrayProps> = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        gap: 15
    }
})

export default ButtonsArray
