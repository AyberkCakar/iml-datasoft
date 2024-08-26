import { Theme } from '../../models';
const _themeTag = '@theme';

export class SettingsService {
  static async getThemeAsync(): Promise<Theme> {
    const theme = await localStorage.getItem(_themeTag);
    return theme as Theme;
  }

  static setTheme(theme: Theme) {
    localStorage.setItem(_themeTag, theme);
  }
}
