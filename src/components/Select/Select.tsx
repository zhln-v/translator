import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getLanguage } from '../../apiController/getLanguage';

type LanguageType = {
    key: string; // Уникальный идентификатор (например, код языка)
    value: string; // Отображаемое название
};

interface SelectProps {
    setSelect?: (value: string) => void;
    selectLanguage?: string;
}

const Select: React.FC<SelectProps> = ({ setSelect, selectLanguage }) => {
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

    return (
        <View style={styles.container}>
            {data.length > 0 && (
                <SelectList
                    arrowicon={<Icon name="arrow-downward" color="#fff" size={20} />}
                    closeicon={<Icon name="arrow-upward" color="#fff" size={20} />}
                    searchicon={<Icon name="search" color="#fff" size={20} />}
                    searchPlaceholder="Поиск"
                    boxStyles={styles.boxStyles}
                    inputStyles={styles.inputStyles}
                    dropdownStyles={styles.dropdownStyles}
                    dropdownTextStyles={styles.dropdownTextStyles}
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
        fontSize: 20,
    },
    dropdownStyles: {
        borderWidth: 0,
    },
    dropdownTextStyles: {
        padding: 0,
        margin: 0,
        color: '#fff',
        fontSize: 20,
    },
});

export default Select;
