import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div className='flex-1 h-full w-full bg-background'>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <div className='size-60'>
                    <Image className='w-full h-full' src="/images/Chatting.svg" width={0} height={0} alt='chatting image' />
                </div>
                <h1 className="scroll-m-20 text-center text-4xl font-semibold tracking-tight text-balance">
                    Contact your team faster
                </h1>
            </div>
        </div>
    )
}

