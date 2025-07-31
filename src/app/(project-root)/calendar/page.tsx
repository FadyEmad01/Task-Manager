import Calendar from '@/components/calendar/Calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

export default function page() {
    return (
        <div className='py-8 w-full'>
            <ScrollArea className='w-full min-w-[1000px]'>
                <Calendar />
            </ScrollArea>
        </div>
    )
}
