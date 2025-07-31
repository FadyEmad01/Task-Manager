"use client"
import DarkLightMode from '@/components/themes/DarkLightMode'
import { ThemeSelector } from '@/components/themes/ThemeSelector'
import { CustomThemeEditor } from '@/components/themes/CustomThemeEditor'
import { ThemeUsageGuide } from '@/components/themes/ThemeUsageGuide'
import React from 'react'

export default function page() {
    return (
        <>
            <h1 className="scroll-m-20 pt-8 text-4xl font-semibold tracking-tight text-balance">
                Settings
            </h1>
            <div className='w-full mt-8 flex flex-col gap-y-2'>
                <DarkLightMode />
            </div>
            {/* <div className='w-full mt-8 flex flex-col gap-y-8'>
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Theme Settings</h2>
                    <DarkLightMode />
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Available Themes</h2>
                    <ThemeSelector />
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Custom Theme Editor</h2>
                    <CustomThemeEditor />
                </div>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Theme Guide</h2>
                    <ThemeUsageGuide />
                </div>
            </div> */}
        </>
    )
}
