import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AllThemes } from './theme';

// Определяем интерфейс для контекста
interface AppSettingsContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
  appTheme: AllThemes;
  setAppTheme: (theme: AllThemes) => void;
}

// Создаём контекст
const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

// Провайдер контекста
export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // начальный размер шрифта
  const [appTheme, setAppTheme] = useState<AllThemes>('blue');

  return (
    <AppSettingsContext.Provider value={{ fontSize, setFontSize, appTheme, setAppTheme }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

// Хук для доступа к контексту
export const useAppSettings = (): AppSettingsContextType => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
