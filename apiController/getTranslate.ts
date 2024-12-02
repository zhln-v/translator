import axios from 'axios';
import { folderID, iamToken } from './keys';

export interface GetTranslateProps {
  text: string;
  language: string;
}

// Типизация для ответа от API
interface TranslateResponse {
  translations: { text: string; detectedLanguageCode: string }[];
}

// Тип возвращаемого значения (переведенный текст и целевой язык)
export interface TranslationResult {
  translatedText: string;
  language: string;
}

// Функция для получения перевода
export const getTranslate = async (
  text: string,
  language: string
): Promise<TranslationResult | undefined> => {
  const url = 'https://translate.api.cloud.yandex.net/translate/v2/translate';

  try {
    const response = await axios.post<TranslateResponse>(
      url,
      {
        folderId: folderID,
        texts: [text],
        targetLanguageCode: language,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: iamToken,
        },
      }
    );

    // Возвращаем объект с переводом и языком
    const translatedText = response.data.translations[0]?.text;
    const detectedLanguage = response.data.translations[0]?.detectedLanguageCode;
    if (translatedText) {
      return {
        translatedText,
        language: detectedLanguage
      };
    } else {
      console.error('Translation not found.');
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching translation:', error);
    return undefined; // Возвращаем undefined в случае ошибки
  }
};