'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { ThemeProviderProps } from 'next-themes'
import { CustomThemeProvider } from '@/lib/themes/custom-theme-context'

const NextThemesProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			{/* <CustomThemeProvider > */}
				{children}
			{/* </CustomThemeProvider> */}
		</NextThemesProvider>
	)
}