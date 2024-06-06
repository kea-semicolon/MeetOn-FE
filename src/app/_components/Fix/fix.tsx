'use client'

import Header from '@/_components/Header/header'
import MemoZone from '@/_components/Memo/memoZone'
import Chat from '@/_components/Chat/chat'
import Image from 'next/image'
import openvidu from '@/_assets/Images/openvidu.png'
import { useEffect, useRef, useState } from 'react'

export default function Fix() {
  const chatRef = useRef<HTMLDivElement>(null)
  const [chatWidth, setChatWidth] = useState<number>(0)

  useEffect(() => {
    if (chatRef.current) {
      setChatWidth(chatRef.current.offsetWidth)
    }
  }, [chatRef])
  return (
    <div className="ml-5 mt-4 w-screen absolute">
      <div ref={chatRef} className="-mt-4 h-screen w-1/5 fixed right-0">
        <Chat />
      </div>
      <div className="ml-2">
        <Header />
      </div>
      <div className="flex">
        <div className="mt-7 w-1/6 overflow-y-auto max-h-screen pb-32">
          <MemoZone />
        </div>
      </div>
      <div
        className="fixed mb-8 bottom-0 right-0 w-[76px] z-50"
        style={{ right: chatWidth + 10 }}
      >
        <Image src={openvidu} alt="openvidu" />
      </div>
    </div>
  )
}
