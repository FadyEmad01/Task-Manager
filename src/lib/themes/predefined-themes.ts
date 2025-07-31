import { CustomTheme } from "../../types/theme";
import { themeContent } from "../../constants/theme-content";

export const predefinedThemes: Record<string, CustomTheme> = {
    default: {
        id: 'default',
        name: 'Default',
        description: 'Default shadcn/ui theme',
        styles: themeContent.default
    },
    twitter: {
        id: 'twitter',
        name: 'Twitter',
        description: 'Twitter-inspired theme',
        styles: themeContent.twitter
    },
    kitty: {
        id: 'modern',
        name: 'Modern',
        description: 'Modern theme with extended color palette',
        styles: themeContent.kitty
    },
    theme1: {
        id: 'theme1',
        name: 'Theme 1',
        description: 'Custom theme with warm colors and extended palette',
        styles: themeContent.theme1
    }
}