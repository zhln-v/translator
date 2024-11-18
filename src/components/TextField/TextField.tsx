import React from 'react'
import { Button, ScrollView, StyleSheet, StyleSheetProperties, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import THEME from '../../theme/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonsArray from '../ButtonsArray/ButtonsArray';

const theme = THEME['purple'];

interface TextFieldProps {
    replyContent?: React.ReactNode;
    button?: React.ReactNode;
    dropdown?: React.ReactNode;
    placeholder?: string;
    title?: string;
    value?: string;
    setValue?: (val: string) => void;
    hidden?: boolean;
    style?: TextStyle;
    styleContainer?: ViewStyle;
    wrapperStyle?: ViewStyle;
    defaultValue?: string;
}

const TextField: React.FC<TextFieldProps> = ({replyContent, button, dropdown, placeholder, title, value, setValue, hidden, style, styleContainer, wrapperStyle, defaultValue}) => {
  return (
    <View style={[styles.container, styleContainer]}>
        <ScrollView style={[styles.wrapper, wrapperStyle]}>
            { title && <Text style={styles.name}>{title}</Text> }
            <TextInput
                defaultValue={defaultValue}
                value={value}
                onChangeText={(text) => setValue && setValue(text)}
                style={[styles.field, style]}
                selectionColor={'#fff'}
                multiline
                numberOfLines={10}
                placeholder={placeholder}
                placeholderTextColor={'#ccc'}
            />

            {replyContent &&
            <ButtonsArray>
                {replyContent}
            </ButtonsArray> }

            {dropdown && 
                <View style={styles.dropdown}>{ dropdown }</View>
            }

            {button}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    wrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: theme.background + 'aa',
        flexDirection: 'column'
    },
    dropdown: {
        // width: '100%',
        // height: 40
    },
    field: {
        backgroundColor: theme.background,
        padding: 15,
        color: '#fff',
        // lineHeight: 25,
        maxHeight: 200,
        fontSize: 20
    },
    name: {
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        color: '#fff'
    }
})

export default TextField
