interface ThemeStyles {
  light: Record<string, string>;
  dark: Record<string, string>;
}

interface ConvertedTheme {
  light: Record<string, string>;
  dark: Record<string, string>;
}

/**
 * Converts CSS variables from :root and .dark selectors to theme content format
 * Supports oklch, hex, rgb, rgba, hsl, hsla color formats
 */
export function convertCSSToTheme(cssContent: string): ConvertedTheme {
  const theme: ConvertedTheme = {
    light: {},
    dark: {}
  };

  // Extract :root variables (light theme)
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  if (rootMatch) {
    const rootContent = rootMatch[1];
    const lightVars = parseCSSVariables(rootContent);
    theme.light = lightVars;
  }

  // Extract .dark variables (dark theme)
  const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/);
  if (darkMatch) {
    const darkContent = darkMatch[1];
    const darkVars = parseCSSVariables(darkContent);
    theme.dark = darkVars;
  }

  return theme;
}

/**
 * Parses CSS variable declarations and converts them to key-value pairs
 */
function parseCSSVariables(cssContent: string): Record<string, string> {
  const variables: Record<string, string> = {};
  
  // Match CSS variable declarations: --variable-name: value;
  const varRegex = /--([^:]+):\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const [, variableName, value] = match;
    const cleanName = variableName.trim();
    const cleanValue = value.trim();
    
    // Skip font and other non-color variables
    if (shouldSkipVariable(cleanName)) {
      continue;
    }

    variables[cleanName] = cleanValue;
  }

  return variables;
}

/**
 * Determines if a variable should be skipped (fonts, shadows, etc.)
 */
function shouldSkipVariable(variableName: string): boolean {
  const skipPatterns = [
    'font-',
    'shadow-',
    'tracking-',
    'spacing-',
    'radius-'
  ];

  return skipPatterns.some(pattern => variableName.startsWith(pattern));
}

/**
 * Validates if a color value is in a supported format
 */
export function isValidColorValue(value: string): boolean {
  const colorPatterns = [
    // OKLCH
    /^oklch\([^)]+\)$/i,
    // Hex
    /^#[0-9a-f]{3,8}$/i,
    // RGB/RGBA
    /^rgb\([^)]+\)$/i,
    /^rgba\([^)]+\)$/i,
    // HSL/HSLA
    /^hsl\([^)]+\)$/i,
    /^hsla\([^)]+\)$/i,
    // Named colors
    /^[a-z]+$/i
  ];

  return colorPatterns.some(pattern => pattern.test(value.trim()));
}

/**
 * Converts CSS content to theme content format for constants
 */
export function generateThemeContent(cssContent: string, themeName: string): string {
  const theme = convertCSSToTheme(cssContent);
  
  let output = `export const ${themeName}Theme = {\n`;
  output += `  light: {\n`;
  
  Object.entries(theme.light).forEach(([key, value]) => {
    output += `    '${key}': "${value}",\n`;
  });
  
  output += `  },\n`;
  output += `  dark: {\n`;
  
  Object.entries(theme.dark).forEach(([key, value]) => {
    output += `    '${key}': "${value}",\n`;
  });
  
  output += `  }\n`;
  output += `}`;
  
  return output;
}

/**
 * Example usage function
 */
export function convertExample(): void {
  const exampleCSS = `
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.1450 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.1450 0 0);
  --primary: #1e9df1;
  --secondary: rgb(15, 20, 25);
  --accent: hsl(210, 100%, 50%);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.1450 0 0);
  --foreground: oklch(0.9850 0 0);
  --card: oklch(0.2050 0 0);
  --card-foreground: oklch(0.9850 0 0);
  --primary: #1c9cf0;
  --secondary: rgb(240, 243, 244);
  --accent: hsl(210, 100%, 45%);
}
  `;

  const theme = convertCSSToTheme(exampleCSS);
  console.log('Converted theme:', theme);
  
  const themeContent = generateThemeContent(exampleCSS, 'example');
  console.log('Generated theme content:\n', themeContent);
} 