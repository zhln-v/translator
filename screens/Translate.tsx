import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@/Theme/ThemeProvider';
import { Picker } from '@react-native-picker/picker';
import { getLanguage } from '@/apiController/getLanguage';
import { getTranslate } from '@/apiController/getTranslate';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Translate = () => {
  const { theme, setTheme, fontSize } = useTheme();
  
  // Состояния
  const [selectedValue, setSelectedValue] = useState<string>(''); // По умолчанию автоопределение
  const [languages, setLanguages] = useState<{ code: string; name: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [translated, setTranslated] = useState<string>('');

  const [currentLanguage, setCurrentLanguage] = useState<string>('Автоопределение');

  // Получение языков
  useEffect(() => {
    getLanguage().then(result => {
      if (result) {
        setLanguages(result);
        setSelectedValue(result[0].code);
      } else {
        console.error('Не удалось загрузить языки.');
      }
    });
  }, []);

  const handleTranslate = () => {
    getTranslate(userInput, selectedValue).then(result => {
      console.log(result)
      if (result) {
        setCurrentLanguage(result.language)
        setTranslated(result.translatedText)
      }
    });
  }

  const currentLanguageName = languages.find(lang => lang.code === currentLanguage)?.name || 'Автоопределение';

  const handleSwap = () => {
    const temp = selectedValue;
    const temp2 = userInput;

    setSelectedValue(currentLanguage)
    setCurrentLanguage(temp);

    setUserInput(translated)
    setTranslated(temp2);
  }

  const handleSaveTranslate = async () => {
    try {
      const newTranslation = {
        original: userInput,
        translated: translated,
        language: currentLanguageName,
      };
  
      // Получаем текущие переводы из AsyncStorage
      const storedTranslations = await AsyncStorage.getItem('translations');
      const translations = storedTranslations ? JSON.parse(storedTranslations) : [];
  
      // Добавляем новый перевод в список
      translations.push(newTranslation);
  
      // Сохраняем обновлённый список переводов
      await AsyncStorage.setItem('translations', JSON.stringify(translations));
      alert('Перевод сохранён!');
    } catch (error) {
      console.error('Ошибка при сохранении перевода:', error);
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.wrapper, { backgroundColor: theme.fieldColor }]}>
        <Text style={{ fontSize, color: theme.textColor, padding: 10 }}>Переведено с ({currentLanguageName})</Text>
        <TextInput
          style={[styles.title, { fontSize, color: theme.textColor }]}
          placeholder="Введите текст"
          placeholderTextColor={theme.textColor + '66'}
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          multiline
        />

        {userInput.length > 0 && (
          <TouchableOpacity onPress={handleTranslate}>
            <Text style={{ color: theme.textColor, textAlign: 'center', padding: 5, fontSize }}>
              Перевести
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity onPress={handleSwap}>
        <MaterialIcons name="swap-vert" size={24} color={theme.buttonColor} />
      </TouchableOpacity>

      <View style={[styles.wrapper, { backgroundColor: theme.fieldColor }]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={{ color: theme.textColor, width: '100%' }}
          dropdownIconColor={theme.buttonColor}
          selectionColor={theme.buttonColor}
          dropdownIconRippleColor={theme.activeTabColor}
        >
          {languages.map((language) => (
            <Picker.Item key={language.code} label={language.name} value={language.code} />
          ))}
        </Picker>
        <TextInput
          style={[styles.title, { fontSize, color: theme.textColor }]}
          placeholder="Результат перевода"
          value={translated}
          placeholderTextColor={theme.textColor + '66'}
        />
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={handleSaveTranslate}>
            <MaterialIcons name="bookmark-border" size={24} style={{width: 24, aspectRatio: 1, margin: 10}} color={theme.buttonColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  title: {
    fontWeight: '400',
    padding: 10,
  },
  wrapper: {
    width: '100%',
    backgroundColor: '#9370d8',
    padding: 10,
    borderRadius: 16,
  },
});

export default Translate;
