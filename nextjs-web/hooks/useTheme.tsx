import { ITheme, Theme, IThemeProvider } from '../models';
import { darkTheme, lightTheme, font, typeScale, fontFamily } from '../styles';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';

import { SettingsService } from '../utils/services';
import Layout from '../components/layout';
import {
  useContext,
  useState,
  ReactNode,
  createContext,
  useEffect
} from 'react';

const createTheme = (themeType: Theme): ITheme => {
  return {
    colors: Theme.LIGHT == themeType ? lightTheme : darkTheme,
    font,
    typeScale,
    typography: {
      fontFamily
    }
  };
};

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setCurrentTheme] = useState<ITheme>(createTheme(Theme.DARK));
  const [isTheme, setIsTheme] = useState<Theme>(Theme.DARK);

  const setTheme = (currentTheme: Theme): void => {
    setCurrentTheme(createTheme(currentTheme));
    setIsTheme(currentTheme);
    SettingsService.setTheme(currentTheme);
  };

  const toggleTheme = (): void => {
    const newTheme = isTheme == Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme(newTheme);
  };

  useEffect(() => {
    SettingsService.getThemeAsync().then((currentTheme) => {
      currentTheme && setTheme(currentTheme);
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isTheme,
        toggleTheme
      }}
    >
      <StyledComponentThemeProvider theme={theme}>
        <Layout>{children}</Layout>
      </StyledComponentThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext) as IThemeProvider;
