import { useTheme } from '@/Theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';

// Тип для переводов
interface Translation {
  original: string;
  translated: string;
  language: string;
}

const Bookmarks = () => {
  const {theme} = useTheme();
  const [translations, setTranslations] = useState<Translation[]>([]);

  // Загрузка сохранённых переводов
  const loadSavedTranslations = async () => {
    try {
      const storedTranslations = await AsyncStorage.getItem('translations');
      if (storedTranslations) {
        const translationsList: Translation[] = JSON.parse(storedTranslations);
        setTranslations(translationsList);
      } else {
        console.log('Нет сохранённых переводов.');
      }
    } catch (error) {
      console.error('Ошибка при загрузке переводов:', error);
    }
  };

  // Сохранение переводов в AsyncStorage
  const saveTranslations = async (newTranslations: Translation[]) => {
    try {
      await AsyncStorage.setItem('translations', JSON.stringify(newTranslations));
    } catch (error) {
      console.error('Ошибка при сохранении переводов:', error);
    }
  };

  // Удаление перевода
  const deleteTranslation = (index: number) => {
    Alert.alert(
      'Удалить перевод?',
      'Вы уверены, что хотите удалить этот перевод?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          onPress: () => {
            const updatedTranslations = translations.filter((_, i) => i !== index);
            setTranslations(updatedTranslations);
            saveTranslations(updatedTranslations);
          },
        },
      ],
    );
  };

  // Загружаем переводы при монтировании компонента
  useFocusEffect(() => {
    loadSavedTranslations();
  });

  // Компонент для отображения перевода
  const renderTranslation = ({ item, index }: { item: Translation, index: number }) => (
    <View style={[styles.translationItem, {backgroundColor: theme.fieldColor}]}>
      <Text style={[styles.originalText, {color: theme.buttonColor}]}>{item.original}</Text>
      <Text style={[styles.translatedText, {color: theme.textColor}]}>{item.translated}</Text>
      <Text style={styles.languageText}>Переведено с: {item.language}</Text>
      <TouchableOpacity onPress={() => deleteTranslation(index)}>
        <Text style={[styles.deleteButton, {color: theme.buttonColor}]}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {translations.length > 0 ? (
        <FlatList
          data={translations}
          renderItem={renderTranslation}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTranslationsText}>Нет сохранённых переводов.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  translationItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  originalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  translatedText: {
    fontSize: 16,
    color: '#555',
  },
  languageText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  noTranslationsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    fontSize: 14,
    color: '#ff0000',
    marginTop: 10,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
});

export default Bookmarks;
