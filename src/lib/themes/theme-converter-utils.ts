import { convertCSSToTheme } from "./css-to-theme-converter";

/**
 * Utility to convert CSS themes and add them to the system
 */
export class ThemeConverterUtils {
  /**
   * Convert CSS content to theme and generate the code to add to theme-content.ts
   */
  static convertAndGenerateCode(cssContent: string, themeName: string): string {
    const theme = convertCSSToTheme(cssContent);
    
    let code = `// ${themeName} theme\n`;
    code += `${themeName}: {\n`;
    code += `  light: {\n`;
    
    Object.entries(theme.light).forEach(([key, value]) => {
      code += `    '${key}': "${value}",\n`;
    });
    
    code += `  },\n`;
    code += `  dark: {\n`;
    
    Object.entries(theme.dark).forEach(([key, value]) => {
      code += `    '${key}': "${value}",\n`;
    });
    
    code += `  }\n`;
    code += `}`;
    
    return code;
  }

  /**
   * Generate the predefined theme entry code
   */
  static generatePredefinedThemeCode(themeName: string, displayName: string, description: string): string {
    return `${themeName}: {
        id: '${themeName}',
        name: '${displayName}',
        description: '${description}',
        styles: themeContent.${themeName}
    }`;
  }

  /**
   * Convert multiple themes from a single CSS file
   */
  static convertMultipleThemes(cssContent: string): { [key: string]: any } {
    // Split CSS content by theme sections
    const themeSections = cssContent.split(/\/\/\/\/\/\/\/\//);
    const themes: { [key: string]: any } = {};

    themeSections.forEach((section, index) => {
      if (section.trim()) {
        const themeName = `theme${index + 1}`;
        const theme = convertCSSToTheme(section);
        themes[themeName] = theme;
      }
    });

    return themes;
  }

  /**
   * Generate complete theme content code for multiple themes
   */
  static generateMultipleThemesCode(cssContent: string): string {
    const themes = this.convertMultipleThemes(cssContent);
    let code = '';

    Object.entries(themes).forEach(([themeName, theme]) => {
      code += `// ${themeName}\n`;
      code += `${themeName}: {\n`;
      code += `  light: {\n`;
      
      Object.entries(theme.light).forEach(([key, value]) => {
        code += `    '${key}': "${value}",\n`;
      });
      
      code += `  },\n`;
      code += `  dark: {\n`;
      
      Object.entries(theme.dark).forEach(([key, value]) => {
        code += `    '${key}': "${value}",\n`;
      });
      
      code += `  }\n`;
      code += `},\n\n`;
    });

    return code;
  }
}

/**
 * Example usage function
 */
export function convertYourThemes(): void {
  const yourCSS = `
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.1450 0 0);
  --primary: oklch(0.2050 0 0);
  --radius: 0.5rem;
}

.dark {
  --background: oklch(0.1450 0 0);
  --foreground: oklch(0.9850 0 0);
  --primary: oklch(0.9220 0 0);
}
  `;

  // Convert single theme
  const singleThemeCode = ThemeConverterUtils.convertAndGenerateCode(yourCSS, 'myTheme');
  console.log('Single theme code:\n', singleThemeCode);

  // Generate predefined theme entry
  const predefinedCode = ThemeConverterUtils.generatePredefinedThemeCode('myTheme', 'My Theme', 'A custom theme');
  console.log('\nPredefined theme entry:\n', predefinedCode);
} 