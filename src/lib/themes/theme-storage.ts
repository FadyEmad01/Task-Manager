import { ThemeState, CustomTheme } from '@/types/theme';

const STORAGE_KEY = 'app-theme-system';

export class ThemeStorage {
  static save(state: ThemeState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...state,
        timestamp: Date.now(),
        version: 1
      }));
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }

  static load(): ThemeState | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      return {
        styles: data.styles,
        currentTheme: data.currentTheme,
        hslAdjustments: data.hslAdjustments || {
          hueShift: 0,
          saturationScale: 1,
          lightnessScale: 1
        }
      };
    } catch (error) {
      console.error('Failed to load theme:', error);
      return null;
    }
  }

  static saveCustomTheme(theme: CustomTheme): void {
    const state = this.load();
    if (state) {
      // Note: This would need to be updated to work with the new state structure
      // For now, we'll just save the theme separately
      try {
        const customThemes = JSON.parse(localStorage.getItem('custom-themes') || '[]');
        const existingIndex = customThemes.findIndex((t: CustomTheme) => t.id === theme.id);
        if (existingIndex >= 0) {
          customThemes[existingIndex] = theme;
        } else {
          customThemes.push(theme);
        }
        localStorage.setItem('custom-themes', JSON.stringify(customThemes));
      } catch (error) {
        console.error('Failed to save custom theme:', error);
      }
    }
  }

  static deleteCustomTheme(themeId: string): void {
    try {
      const customThemes = JSON.parse(localStorage.getItem('custom-themes') || '[]');
      const filteredThemes = customThemes.filter((t: CustomTheme) => t.id !== themeId);
      localStorage.setItem('custom-themes', JSON.stringify(filteredThemes));
    } catch (error) {
      console.error('Failed to delete custom theme:', error);
    }
  }

  static exportTheme(themeId: string): string | null {
    try {
      const customThemes = JSON.parse(localStorage.getItem('custom-themes') || '[]');
      const theme = customThemes.find((t: CustomTheme) => t.id === themeId);
      return theme ? JSON.stringify(theme, null, 2) : null;
    } catch (error) {
      console.error('Failed to export theme:', error);
      return null;
    }
  }

  static importTheme(themeJson: string): boolean {
    try {
      const theme: CustomTheme = JSON.parse(themeJson);
      // Validate theme structure here
      this.saveCustomTheme(theme);
      return true;
    } catch (error) {
      console.error('Failed to import theme:', error);
      return false;
    }
  }
}