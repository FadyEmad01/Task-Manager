export interface HSLAdjustments {
    hueShift: number;        // -180 to 180
    saturationScale: number; // 0 to 2
    lightnessScale: number;  // 0 to 2
}

export interface ThemeStyles {
    light: Record<string, string>;
    dark: Record<string, string>;
}

export interface CustomTheme {
    id: string;
    name: string;
    description?: string;
    styles: ThemeStyles;
    createdAt?: string;
}

export interface ThemeState {
    styles: ThemeStyles;
    currentTheme: string;
    hslAdjustments: HSLAdjustments;
}

export interface ThemeCheckpoint {
    styles: ThemeStyles;
    currentTheme: string;
    hslAdjustments: HSLAdjustments;
}

export interface ThemeHistoryState {
    state: ThemeState;
    timestamp: number;
}

export interface ThemeSystemState {
    state: {
        themeState: ThemeState;
        themeCheckpoint: ThemeCheckpoint;
    };
    version: number;
    future: ThemeHistoryState[];
    history: ThemeHistoryState[];
    customThemes: CustomTheme[];
}