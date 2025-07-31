import { ThemeConverterUtils } from '../../lib/themes/theme-converter-utils';

/**
 * Example: How to convert CSS themes to JavaScript objects
 */

// Example 1: Convert a single theme
export function convertSingleThemeExample() {
  const cssContent = `
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.5rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.371 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.275 0 0);
  --input: oklch(0.325 0 0);
  --ring: oklch(0.556 0 0);
}
  `;

  const themeCode = ThemeConverterUtils.convertAndGenerateCode(cssContent, 'myCustomTheme');
  console.log('Generated theme code:');
  console.log(themeCode);

  const predefinedCode = ThemeConverterUtils.generatePredefinedThemeCode(
    'myCustomTheme', 
    'My Custom Theme', 
    'A beautiful custom theme'
  );
  console.log('\nPredefined theme entry:');
  console.log(predefinedCode);
}

// Example 2: Convert multiple themes from a single file
export function convertMultipleThemesExample() {
  const cssContent = `
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --radius: 0.5rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
}

//////////

:root {
  --background: oklch(0.98 0 0);
  --foreground: oklch(0.24 0 0);
  --primary: oklch(0.43 0.04 42);
  --radius: 0.3rem;
}

.dark {
  --background: oklch(0.18 0 0);
  --foreground: oklch(0.95 0 0);
  --primary: oklch(0.92 0.05 66);
}
  `;

  const themesCode = ThemeConverterUtils.generateMultipleThemesCode(cssContent);
  console.log('Generated multiple themes code:');
  console.log(themesCode);
}

// Example 3: Convert themes with different color formats
export function convertMixedColorFormatsExample() {
  const cssContent = `
:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: rgb(59, 130, 246);
  --secondary: hsl(210, 40%, 96%);
  --accent: oklch(0.97 0 0);
  --radius: 0.5rem;
}

.dark {
  --background: #000000;
  --foreground: oklch(0.985 0 0);
  --primary: rgb(96, 165, 250);
  --secondary: hsl(217, 33%, 17%);
  --accent: oklch(0.269 0 0);
}
  `;

  const themeCode = ThemeConverterUtils.convertAndGenerateCode(cssContent, 'mixedFormatsTheme');
  console.log('Mixed color formats theme:');
  console.log(themeCode);
}

// Run examples
if (typeof window !== 'undefined') {
  // Only run in browser environment
  console.log('=== Theme Converter Examples ===');
  convertSingleThemeExample();
  console.log('\n=== Multiple Themes Example ===');
  convertMultipleThemesExample();
  console.log('\n=== Mixed Color Formats Example ===');
  convertMixedColorFormatsExample();
} 