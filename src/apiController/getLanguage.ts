import axios from 'axios'

import { folderId, token } from "./keys";

export type Language = {
  code: string;
  name: string;
};

const url = 'https://translate.api.cloud.yandex.net/translate/v2/languages';

export const getLanguage = async () => {
    try {
        const response = await axios.post<{ languages: Language[] }>(
            url,
            {
                folderId: folderId,
            },
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                },
            }
            );
        return response.data.languages || [];
    } catch (error) {
        console.error('Языки не получены', error);
    } finally {
        // setIsLoading(false);
    }
};