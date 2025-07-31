'use client'

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { useTheme as useNextTheme } from 'next-themes'

import { HSLUtils } from './hsl-utils'
import { CustomTheme, HSLAdjustments, ThemeSystemState } from '@/types/theme'
import { predefinedThemes } from './predefined-themes'


type CustomThemeAction =
    | { type: 'SET_CUSTOM_THEME'; payload: string }
    | { type: 'UPDATE_THEME_STYLE'; payload: { mode: 'light' | 'dark'; key: string; value: string } }
    | { type: 'UPDATE_HSL_ADJUSTMENTS'; payload: Partial<HSLAdjustments> }
    | { type: 'APPLY_HSL_ADJUSTMENTS' }
    | { type: 'RESET_HSL_ADJUSTMENTS' }
    | { type: 'ADD_CUSTOM_THEME'; payload: CustomTheme }
    | { type: 'UPDATE_CUSTOM_THEME'; payload: { id: string; updates: Partial<CustomTheme> } }
    | { type: 'DELETE_CUSTOM_THEME'; payload: string }
    | { type: 'UNDO' }
    | { type: 'REDO' }
    | { type: 'LOAD_STATE'; payload: ThemeSystemState }

const createInitialState = (): ThemeSystemState => ({
    state: {
        themeState: {
            styles: predefinedThemes.default.styles,
            currentTheme: 'default',
            hslAdjustments: {
                hueShift: 0,
                saturationScale: 1,
                lightnessScale: 1
            }
        },
        themeCheckpoint: {
            styles: predefinedThemes.default.styles,
            currentTheme: 'default',
            hslAdjustments: { hueShift: 0, saturationScale: 1, lightnessScale: 1 }
        }
    },
    version: 1,
    future: [],
    history: [],
    customThemes: []
})

function customThemeReducer(state: ThemeSystemState, action: CustomThemeAction): ThemeSystemState {
    const createHistoryEntry = () => ({
        state: { ...state.state.themeState },
        timestamp: Date.now()
    })

    switch (action.type) {
        case 'SET_CUSTOM_THEME': {
            const theme = [...Object.values(predefinedThemes), ...state.customThemes]
                .find(t => t.id === action.payload)

            if (!theme) return state

            const newThemeState = {
                ...state.state.themeState,
                styles: theme.styles,
                currentTheme: action.payload,
                hslAdjustments: { hueShift: 0, saturationScale: 1, lightnessScale: 1 }
            }

            return {
                ...state,
                state: { ...state.state, themeState: newThemeState },
                history: [...state.history, createHistoryEntry()].slice(-50),
                future: []
            }
        }

        case 'UPDATE_THEME_STYLE': {
            const newStyles = {
                ...state.state.themeState.styles,
                [action.payload.mode]: {
                    ...state.state.themeState.styles[action.payload.mode],
                    [action.payload.key]: action.payload.value
                }
            }

            const newThemeState = {
                ...state.state.themeState,
                styles: newStyles,
                currentTheme: 'custom' // Switch to custom when user makes changes
            }

            return {
                ...state,
                state: { ...state.state, themeState: newThemeState },
                history: [...state.history, createHistoryEntry()].slice(-50),
                future: []
            }
        }

        case 'UPDATE_HSL_ADJUSTMENTS': {
            return {
                ...state,
                state: {
                    ...state.state,
                    themeState: {
                        ...state.state.themeState,
                        hslAdjustments: {
                            ...state.state.themeState.hslAdjustments,
                            ...action.payload
                        }
                    }
                }
            }
        }

        case 'APPLY_HSL_ADJUSTMENTS': {
            const { styles, hslAdjustments } = state.state.themeState
            const adjustedStyles = {
                light: HSLUtils.applyAdjustmentsToTheme(styles.light, hslAdjustments),
                dark: HSLUtils.applyAdjustmentsToTheme(styles.dark, hslAdjustments)
            }

            const newThemeState = {
                ...state.state.themeState,
                styles: adjustedStyles,
                hslAdjustments: { hueShift: 0, saturationScale: 1, lightnessScale: 1 },
                currentTheme: 'custom'
            }

            return {
                ...state,
                state: { ...state.state, themeState: newThemeState },
                history: [...state.history, createHistoryEntry()].slice(-50),
                future: []
            }
        }

        case 'ADD_CUSTOM_THEME': {
            return {
                ...state,
                customThemes: [...state.customThemes, action.payload]
            }
        }

        case 'UPDATE_CUSTOM_THEME': {
            return {
                ...state,
                customThemes: state.customThemes.map((theme: CustomTheme) => 
                    theme.id === action.payload.id 
                        ? { ...theme, ...action.payload.updates }
                        : theme
                )
            }
        }

        case 'DELETE_CUSTOM_THEME': {
            return {
                ...state,
                customThemes: state.customThemes.filter((t: CustomTheme) => t.id !== action.payload)
            }
        }

        case 'UNDO': {
            if (state.history.length === 0) return state

            const lastHistory = state.history[state.history.length - 1]
            return {
                ...state,
                state: { ...state.state, themeState: lastHistory.state },
                history: state.history.slice(0, -1),
                future: [createHistoryEntry(), ...state.future]
            }
        }

        case 'REDO': {
            if (state.future.length === 0) return state

            const nextFuture = state.future[0]
            return {
                ...state,
                state: { ...state.state, themeState: nextFuture.state },
                history: [...state.history, createHistoryEntry()],
                future: state.future.slice(1)
            }
        }

        case 'LOAD_STATE': {
            return action.payload
        }

        default:
            return state
    }
}

interface CustomThemeContextType {
    state: ThemeSystemState
    currentTheme: CustomTheme | null
    allThemes: CustomTheme[]
    customThemes: CustomTheme[]
    setCustomTheme: (themeId: string) => void
    updateThemeStyle: (mode: 'light' | 'dark', key: string, value: string) => void
    updateHSLAdjustments: (adjustments: Partial<HSLAdjustments>) => void
    applyHSLAdjustments: () => void
    resetHSLAdjustments: () => void
    createCustomTheme: (theme: CustomTheme) => void
    updateCustomTheme: (themeId: string, updates: Partial<CustomTheme>) => void
    deleteCustomTheme: (themeId: string) => void
    addCustomTheme: (theme: CustomTheme) => void
    undo: () => void
    redo: () => void
    canUndo: boolean
    canRedo: boolean
    getAdjustedStyles: (mode: 'light' | 'dark') => Record<string, string>
    exportThemeCSS: () => string
    exportThemeJSON: () => string
    importThemeJSON: (json: string) => boolean
}

const CustomThemeContext = createContext<CustomThemeContextType | null>(null)

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
    const { resolvedTheme: nextTheme } = useNextTheme()
    const [state, dispatch] = useReducer(customThemeReducer, createInitialState())

    const allThemes = [...Object.values(predefinedThemes), ...state.customThemes]
    const currentTheme = allThemes.find(t => t.id === state.state.themeState.currentTheme) || predefinedThemes.default

    const setCustomTheme = useCallback((themeId: string) => {
        dispatch({ type: 'SET_CUSTOM_THEME', payload: themeId })
    }, [])

    const updateThemeStyle = useCallback((mode: 'light' | 'dark', key: string, value: string) => {
        dispatch({ type: 'UPDATE_THEME_STYLE', payload: { mode, key, value } })
    }, [])

    const updateHSLAdjustments = useCallback((adjustments: Partial<HSLAdjustments>) => {
        dispatch({ type: 'UPDATE_HSL_ADJUSTMENTS', payload: adjustments })
    }, [])

    const applyHSLAdjustments = useCallback(() => {
        dispatch({ type: 'APPLY_HSL_ADJUSTMENTS' })
    }, [])

    const resetHSLAdjustments = useCallback(() => {
        dispatch({ type: 'RESET_HSL_ADJUSTMENTS' })
    }, [])

    const createCustomTheme = useCallback((theme: CustomTheme) => {
        dispatch({ type: 'ADD_CUSTOM_THEME', payload: theme })
    }, [])

    const updateCustomTheme = useCallback((themeId: string, updates: Partial<CustomTheme>) => {
        dispatch({ type: 'UPDATE_CUSTOM_THEME', payload: { id: themeId, updates } })
    }, [])

    const deleteCustomTheme = useCallback((themeId: string) => {
        dispatch({ type: 'DELETE_CUSTOM_THEME', payload: themeId })
    }, [])

    const addCustomTheme = useCallback((theme: CustomTheme) => {
        dispatch({ type: 'ADD_CUSTOM_THEME', payload: theme })
    }, [])

    const undo = useCallback(() => {
        dispatch({ type: 'UNDO' })
    }, [])

    const redo = useCallback(() => {
        dispatch({ type: 'REDO' })
    }, [])

    const getAdjustedStyles = useCallback((mode: 'light' | 'dark') => {
        const { styles, hslAdjustments } = state.state.themeState
        const currentStyles = styles[mode]
        return HSLUtils.applyAdjustmentsToTheme(currentStyles, hslAdjustments)
    }, [state.state.themeState])

    const exportThemeCSS = useCallback(() => {
        const lightStyles = getAdjustedStyles('light')
        const darkStyles = getAdjustedStyles('dark')

        const lightVars = Object.entries(lightStyles)
            .map(([key, value]) => `    --${key}: ${value};`)
            .join('\n')

        const darkVars = Object.entries(darkStyles)
            .map(([key, value]) => `    --${key}: ${value};`)
            .join('\n')

        return `@layer base {
  :root {
${lightVars}
  }

  .dark {
${darkVars}
  }
}`
    }, [getAdjustedStyles])

    const exportThemeJSON = useCallback(() => {
        const themeData = {
            id: `custom-${Date.now()}`,
                name: 'Custom Theme',
            styles: {
                light: getAdjustedStyles('light'),
                dark: getAdjustedStyles('dark')
            },
            createdAt: new Date().toISOString()
        }
        return JSON.stringify(themeData, null, 2)
    }, [getAdjustedStyles])

    const importThemeJSON = useCallback((json: string) => {
        try {
            const themeData = JSON.parse(json)
            if (themeData.styles && themeData.styles.light && themeData.styles.dark) {
                addCustomTheme(themeData)
                return true
            }
            return false
        } catch {
            return false
        }
    }, [addCustomTheme])

    // Apply theme to document when theme or mode changes
    useEffect(() => {
        const root = document.documentElement
        const currentTheme = state.state.themeState.currentTheme
        const mode = nextTheme as 'light' | 'dark'

        if (mode && (mode === 'light' || mode === 'dark')) {
            const adjustedStyles = getAdjustedStyles(mode)
            Object.entries(adjustedStyles).forEach(([key, value]) => {
                root.style.setProperty(`--${key}`, value as string)
            })
        }
    }, [nextTheme, getAdjustedStyles, state.state.themeState.currentTheme])

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('custom-theme-state', JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save theme state:', error)
    }
  }, [state])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('custom-theme-state')
      if (saved) {
        const loadedState = JSON.parse(saved)
        dispatch({ type: 'LOAD_STATE', payload: loadedState })
      }
    } catch (error) {
      console.error('Failed to load theme state:', error)
    }
  }, [])

  const contextValue: CustomThemeContextType = {
    state,
    currentTheme,
    allThemes,
    customThemes: state.customThemes,
    setCustomTheme,
    updateThemeStyle,
    updateHSLAdjustments,
    applyHSLAdjustments,
    resetHSLAdjustments,
    createCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
    addCustomTheme,
    undo,
    redo,
    canUndo: state.history.length > 0,
    canRedo: state.future.length > 0,
    getAdjustedStyles,
    exportThemeCSS,
    exportThemeJSON,
    importThemeJSON
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      {children}
    </CustomThemeContext.Provider>
  )
}

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext)
  if (!context) {
    throw new Error('useCustomTheme must be used within CustomThemeProvider')
  }
  return context
}