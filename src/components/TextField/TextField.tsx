import React from 'react'
import { Button, ScrollView, StyleSheet, StyleSheetProperties, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import THEME from '../../theme/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonsArray from '../ButtonsArray/ButtonsArray';
import { useAppSettings } from '../../theme/ThemeProvider';

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
    const {appTheme, fontSize} = useAppSettings();
    const theme = THEME[appTheme];
  return (
    <View style={[styles.container, styleContainer]}>
        <ScrollView style={[styles.wrapper, wrapperStyle, {backgroundColor: theme.background + 'aa'}, wrapperStyle?.backgroundColor && {backgroundColor: wrapperStyle.backgroundColor}]}>
            { title && <Text style={[styles.name, {color: theme.color, fontSize}]}>{title}</Text> }
            <TextInput
                defaultValue={defaultValue}
                value={value}
                onChangeText={(text) => setValue && setValue(text)}
                style={[styles.field, style, { fontSize, color: theme.color, backgroundColor: theme.background }, style?.backgroundColor && {backgroundColor: style.backgroundColor}]}
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
                <View>{ dropdown }</View>
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
        // backgroundColor: theme.background + 'aa',
        flexDirection: 'column'
    },
    field: {
        // backgroundColor: theme.background,
        padding: 15,
        // color: '#fff',
        maxHeight: 200,
        fontSize: 20
    },
    name: {
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        // color: '#fff'
    }
})

export default TextField
