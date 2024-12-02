import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@/Theme/ThemeProvider';
import { Picker } from '@react-native-picker/picker';
import { getLanguage } from '@/apiController/getLanguage';
import { getTranslate } from '@/apiController/getTranslate';

const Translate = () => {
  const { theme, setTheme } = useTheme();
  
  // Состояния
  const [selectedValue, setSelectedValue] = useState<string>(''); // По умолчанию автоопределение
  const [languages, setLanguages] = useState<{ code: string; name: string }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [translated, setTranslated] = useState<string>('');

  const [currentLanguage, setCurrentLanguage] = useState('Автоопределение');

  // Получение языков
  useEffect(() => {
    getLanguage().then(result => {
      if (result) {
        setLanguages(result);
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

  // Установка темы при загрузке
  useEffect(() => {
    setTheme(4);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.wrapper, { backgroundColor: theme.fieldColor }]}>
        <Text style={{ color: theme.textColor, padding: 10 }}>{currentLanguage}</Text>
        <TextInput
          style={[styles.title, { color: theme.textColor }]}
          placeholder="Введите текст"
          placeholderTextColor={theme.textColor + '66'}
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
          multiline
        />

        {userInput.length > 0 && (
          <TouchableOpacity onPress={handleTranslate}>
            <Text style={{ color: theme.textColor, textAlign: 'center', padding: 5, fontSize: 18 }}>
              Перевести
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity>
        <MaterialIcons name="swap-vert" size={24} color={theme.textColor} />
      </TouchableOpacity>

      <View style={[styles.wrapper, { backgroundColor: theme.fieldColor }]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={{ color: theme.textColor, width: '100%' }}
          dropdownIconColor={theme.textColor}
          selectionColor={theme.textColor}
          dropdownIconRippleColor={theme.activeTabColor}
        >
          {/* Заполнение Picker */}
          {languages.map((language) => (
            <Picker.Item key={language.code} label={language.name} value={language.code} />
          ))}
        </Picker>
        <TextInput
          style={[styles.title, { color: theme.textColor }]}
          placeholder="Результат перевода"
          value={translated}
          placeholderTextColor={theme.textColor + '66'}
        />
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
    fontSize: 18,
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
