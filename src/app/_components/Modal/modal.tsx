import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '@/_assets/Images/logo.png'

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
    <div className="gap-7 flex justify-center flex-col items-center w-[481px] h-[280px] rounded-[4px] bg-[#1D1D1D]">
      <div className="flex">
        <Image className="w-[99px]" src={logo} alt="logo" />
      </div>
      <input
        className="pl-2 bg-[#000000] text-white outline-0 w-[308px] h-[48px] rounded-[6px]"
        placeholder={hostStatus}
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <div className="flex gap-3">
        <button
          className="bg-[#4E5058] text-white rounded-[3px] w-[150px] h-[54px]"
          type="button"
          onClick={handleCancelClick}
        >
          취소
        </button>
        <button
          className="bg-[#000000] border border-[#D2FA64] text-[#D2FA64] rounded-[3px] w-[150px] h-[54px]"
          type="button"
          onClick={handleCreateClick}
        >
          {' '}
          참여하기
        </button>
      </div>
    </div>
  )
}
