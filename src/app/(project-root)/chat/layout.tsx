import { ChatPanel } from '@/components/layout/chats-panel'
import Chat from '@/components/project/chat'
import React from 'react'

export default function ChatLayout({ children, }: Readonly<{ children: React.ReactNode }>) {

  return (
    <>
      <div className='flex h-[89vh] md:h-[86vh] md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none transition-all ease-in-out duration-300'>
        {children}
        <ChatPanel />
      </div>

    </>
  )
}
