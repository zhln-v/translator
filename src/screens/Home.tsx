import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TextField from '../components/TextField/TextField'
import PicButton from '../components/Button/PicButton';
import Button from '../components/Button/Button';
import Select from '../components/Select/Select';
import { getTranslate } from '../apiController/getTranslate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import THEME from '../theme/theme';

const theme = THEME['purple']

const Home = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [translateText, setTranslateText] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [prevLanguage, setPrevLangusge] = useState<string>('');

    const handleTranslate = () => {
        setTranslateText('Переводим...');
        if (!selectedLanguage) {
            setTranslateText('Нужно выбрать язык');
        } else if (!userInput) {
            setTranslateText('Нужно ввести текст');
        } else {
            getTranslate(userInput, selectedLanguage).then(result => {
                if (!result) {
                    setTranslateText('Не удалось перевести!');
                } else {
                    console.log(result);
                    setTranslateText(result.translatedText);
                    setPrevLangusge(result.language);
                }
            })
        }
    }

    const handleSaveOnDevice = async () => {
        if (selectedLanguage && prevLanguage && userInput && translateText) {
            const translationData = {
                originalText: userInput,
                translatedText: translateText,
                sourceLanguage: prevLanguage,
                targetLanguage: selectedLanguage,
                timestamp: new Date().toISOString(), // Сохраняем дату и время
            };
    
            try {
                // Получаем текущий список переводов из AsyncStorage
                const existingTranslations = await AsyncStorage.getItem('translations');
                const translations = existingTranslations ? JSON.parse(existingTranslations) : [];
    
                // Добавляем новый перевод в массив
                translations.push(translationData);
    
                // Сохраняем обновлённый массив в AsyncStorage
                await AsyncStorage.setItem('translations', JSON.stringify(translations));
    
                console.log('Перевод сохранён успешно!', translationData);
            } catch (error) {
                console.error('Ошибка при сохранении перевода:', error);
            }
        } else {
            console.log('Все поля должны быть заполнены перед сохранением!');
        }
    };

    const handleSwapText = () => {
        const tempUserInput = userInput;
        setUserInput(translateText);
        setTranslateText(tempUserInput);

        const tempLanguage = selectedLanguage;
        setSelectedLanguage(prevLanguage);
        setPrevLangusge(tempLanguage);
    }

    const handleClearUserInput = () => {
        setUserInput('');
    }
    
    const handleClearTranslated = () => {
        setTranslateText('');
    }

    return (
        <ScrollView style={styles.scroll}>
            <ScrollView>
                <TextField
                    placeholder='Введите текст'
                    value={userInput}
                    setValue={setUserInput}
                    replyContent={
                        <>
                            <PicButton name='content-paste' color='#fff' />
                            <PicButton name='copy-all' color='#fff' />
                            <PicButton name='clear' color='#f00' onPress={handleClearUserInput} />
                        </>
                    }
                    button={
                        <Button title='Перевести' onPress={handleTranslate} />
                    }
                    dropdown={<Select setSelect={setSelectedLanguage} selectLanguage={selectedLanguage}/>}
                />
            </ScrollView>
            <View style={styles.contentCenter}>
                <PicButton name='swap-vert' color={theme.background} onPress={handleSwapText} />
            </View>
            <ScrollView>
                <TextField
                    value={translateText}
                    setValue={setTranslateText}
                    title='Перевод'
                    hidden
                    replyContent={
                        <>
                            <PicButton name='bookmark-outline' color='#fff' onPress={handleSaveOnDevice} />
                            <PicButton name='copy-all' color='#fff' />
                            <PicButton name='clear' color='#f00' onPress={handleClearTranslated} />
                        </>
                    }
                />
            </ScrollView>
        </ScrollView>
    )
    }

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Home
