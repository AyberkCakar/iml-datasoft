import { useContext, ReactNode, createContext } from 'react';
import { ThemeProvider } from './useTheme';
import { TranslationProvider } from './useTranslation';

export const CurrentContext = createContext({});

export const CurrentProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CurrentContext.Provider value={{}}>
      <TranslationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TranslationProvider>
    </CurrentContext.Provider>
  );
};

export const useCurrent = () => useContext(CurrentContext);
