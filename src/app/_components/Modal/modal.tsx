import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ModalProps {
  onClose: () => void
  onCreate: () => void
  channelName: string
  hostStatus: string
  setChannelName: React.Dispatch<React.SetStateAction<string>>
}

export default function Modal({
  onClose,
  onCreate,
  channelName,
  setChannelName,
  hostStatus,
}: ModalProps) {
  const route = useRouter()
  const handleCreateClick = () => {
    onCreate()
    route.push('/main')
  }

  const handleCancelClick = () => {
    onClose()
  }
  return (
    <div className="gap-7 flex justify-center flex-col items-center w-[481px] h-[280px] rounded-[18px] bg-white">
      <div className="flex">
        <p className="text-[28px] text-[#FFCD00] font-bold">Meet;</p>
        <p className="text-[28px] text-[#4D4D4D] font-bold">ON</p>
      </div>
      <input
        className="pl-2 outline-0 w-[308px] border-2 h-[48px] rounded-[6px]"
        placeholder={hostStatus}
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <div className="flex gap-3">
        <button
          className="bg-[#D9D9D9] rounded-[6px] w-[150px] h-[54px]"
          type="button"
          onClick={handleCancelClick}
        >
          취소
        </button>
        <button
          className="bg-[#FFCD00] text-white rounded-[6px] w-[150px] h-[54px]"
          type="button"
          onClick={handleCreateClick}
        >
          {' '}
          만들기
        </button>
      </div>
    </div>
  )
}
