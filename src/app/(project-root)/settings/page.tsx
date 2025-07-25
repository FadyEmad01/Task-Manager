"use client"
import DarkLightMode from '@/components/layout/DarkLightMode'
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

        </>
    )
}
