import React, { createContext, useContext, useState, ReactNode } from 'react';
import themes from './themes';

// Тип для одной темы
export interface Theme {
  name: string;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
  buttonColor: string;
  fieldColor: string;
  activeTabColor: string;
}

// Тип для контекста
interface ThemeContextType {
  theme: Theme; // Текущая тема
  themeName: string; // Название текущей темы
  setTheme: (index: number) => void; // Установка темы по индексу
  nextTheme: () => void; // Переключение на следующую тему
  themes: Theme[]; // Все темы
}

// Создаем контекст с типом или `null` для начального значения
const ThemeContext = createContext<ThemeContextType | null>(null);

// Пользовательский хук для доступа к теме
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен быть использован внутри ThemeProvider');
  }
  return context;
};

// Тип для свойств провайдера
interface ThemeProviderProps {
  children: ReactNode; // Дочерние компоненты
}

// Провайдер темы
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(0); // Индекс текущей темы

  // Переключение на следующую тему
  const nextTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  // Установка темы по индексу
  const setTheme = (index: number) => {
    if (index >= 0 && index < themes.length) {
      setThemeIndex(index);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeIndex], // Текущая тема
        themeName: themes[themeIndex].name, // Название текущей темы
        setTheme,
        nextTheme,
        themes, // Массив всех тем
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
