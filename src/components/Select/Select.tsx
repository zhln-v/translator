import React, { useEffect, useState } from 'react';
import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getLanguage } from '../../apiController/getLanguage';
import { useAppSettings } from '../../theme/ThemeProvider';

type LanguageType = {
    key: string; // Уникальный идентификатор (например, код языка)
    value: string; // Отображаемое название
};

interface SelectProps {
    setSelect?: (value: string) => void;
    selectLanguage?: string;
    scrollEnabled: () => void;
}

const Select: React.FC<SelectProps> = ({ setSelect, selectLanguage, scrollEnabled }) => {
    const [data, setData] = useState<LanguageType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getLanguage();
                if (result) {
                    const formattedData = result
                        .filter(item => item.name)
                        .map(item => ({
                            key: item.code,
                            value: item.name,
                        }));
                    // console.log('Formatted data:', formattedData);
                    setData(formattedData);
                }
            } catch (error) {
                console.error('Ошибка при загрузке языков:', error);
            }
        };

        fetchData();
    }, []);

    // Ищем объект с выбранным языком для использования в defaultOption
    const defaultOption = data.find(item => item.key === selectLanguage);

    const {fontSize} = useAppSettings();

    return (
        <View style={styles.container}>
            {data.length > 0 && (
                    <SelectList
                        arrowicon={<Icon name="arrow-downward" color="#fff" size={20} />}
                        closeicon={<Icon name="arrow-upward" color="#fff" size={20} />}
                        searchicon={<Icon name="search" color="#fff" size={20} />}
                        searchPlaceholder="Поиск"
                        boxStyles={styles.boxStyles}
                        inputStyles={[styles.inputStyles, {fontSize}]}
                        dropdownStyles={[styles.dropdownStyles, {fontSize}]}
                        dropdownTextStyles={[styles.dropdownTextStyles, {fontSize}]}
                        setSelected={(val: string) => {
                            if (setSelect) setSelect(val);
                        }}
                        data={data}
                        save="key"
                        defaultOption={defaultOption}
                        placeholder="Выберите язык"
                        
                    />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    boxStyles: {
        borderWidth: 0,
    },
    inputStyles: {
        color: '#fff',
        paddingHorizontal: 15,
    },
    dropdownStyles: {
        borderWidth: 0,
    },
    dropdownTextStyles: {
        padding: 0,
        margin: 0,
        color: '#fff'
    },
});

export default Select;
