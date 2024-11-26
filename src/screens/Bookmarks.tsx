import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import THEME from '../theme/theme';
import PicButton from '../components/Button/PicButton';
import ButtonsArray from '../components/ButtonsArray/ButtonsArray';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../components/TextField/TextField';
import { useAppSettings } from '../theme/ThemeProvider';

const theme = THEME['purple'];

interface Translation {
    targetLanguage: string;
    sourceLanguage: string;
    originalText: string;
    translatedText: string;
}

const Bookmarks = () => {
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [translate, setTranslate] = useState<string>('');
    const [currentEdit, setCurrentEdit] = useState<number>(-1);

    useFocusEffect(() => {
        const loadTranslations = async () => {
            try {
                const savedTranslations = await AsyncStorage.getItem('translations');
                if (savedTranslations) {
                    setTranslations(JSON.parse(savedTranslations));
                }
            } catch (error) {
                console.error('Ошибка при загрузке переводов:', error);
            }
        };

        loadTranslations();
    });

    const handleSave = async (index: number) => {
      try {
          const updatedTranslations = [...translations]; // Создаем копию массива
          const currentTranslation = updatedTranslations[index]; // Находим текущий перевод
  
          // Обновляем данные для текущего перевода
          updatedTranslations[index] = {
              ...currentTranslation,
              translatedText: translate, // Здесь вставляем новое значение
          };
  
          setTranslations(updatedTranslations); // Обновляем состояние
          await AsyncStorage.setItem('translations', JSON.stringify(updatedTranslations)); // Сохраняем в AsyncStorage
      } catch (error) {
          console.error('Ошибка при обновлении перевода:', error);
      }
  };

    const handleDelete = async (index: number) => {
      try {
          const updatedTranslations = translations.filter((_, i) => i !== index);
          setTranslations(updatedTranslations);
          await AsyncStorage.setItem('translations', JSON.stringify(updatedTranslations));
      } catch (error) {
          console.error('Ошибка при удалении перевода:', error);
      }
  };
  
  const { appTheme, fontSize } = useAppSettings();

  const theme = THEME[appTheme];

    return (
        <View style={styles.container}>
            <FlatList
                data={translations}
                keyExtractor={(item, index) => `${item.originalText}-${index}`}
                renderItem={({ item, index }) => (
                    <View style={styles.record}>

                        <View style={[styles.contentName, {backgroundColor: theme.background}]}>
                              <Text style={styles.contentNameText}>
                                {item.sourceLanguage}
                              </Text>
                               <Icon name='arrow-right-alt' color={'#fff'} size={16} />
                              <Text style={styles.contentNameText}>
                                {item.targetLanguage}
                              </Text>
                        </View>

                        <View style={[styles.contentDescription, {backgroundColor: theme.background + 'aa'}]}>
                          <Text style={[styles.originalText, {fontSize}]}>{item.originalText}</Text>
                          <View style={styles.centerContent}>
                            <Icon name='translate' color={theme.background} size={30} />
                          </View>
                          <TextField
                            setValue={setTranslate}
                            defaultValue={ item.translatedText }
                            styleContainer={{padding: 0}} 
                            style={{backgroundColor: '#0000'}}
                            wrapperStyle={{
                              backgroundColor: '#0000'
                            }}
                          />
                        </View>


                        <View style={[styles.buttonsArray, { backgroundColor: theme.background + '' }]}>
                            <ButtonsArray>
                                <PicButton name="save" color="#fff" onPress={() => {handleSave(index)}} />
                                <PicButton name="delete" color="#f00" onPress={() => { handleDelete(index) } } />
                            </ButtonsArray>
                        </View>

                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        gap: 7.5,
    },
    centerContent: {
      alignItems: 'center'
    },
    record: {
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    },
    contentName: {
        padding: 10,
        // backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    contentNameText: {
        color: '#fff',
    },
    contentDescription: {
        // backgroundColor: theme.background + 'aa',
        // alignItems: 'center',
        padding: 0,
        gap: 10
    },
    contentDescriptionText: {
        color: '#ccc',
    },
    buttonsArray: {
        // backgroundColor: theme.background + 'aa',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    originalText: {
      padding: 15,
      fontSize: 18,
      color: '#fff'
    }
})

export default Bookmarks;
