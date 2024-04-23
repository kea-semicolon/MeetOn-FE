import { useState } from 'react'

interface ModalProps {
  onClose: () => void
  onCreate: () => void
}

export default function Modal({ onClose, onCreate }: ModalProps) {
  const [channelName, setChannelName] = useState<string>('')
  const handleCreateClick = () => {
    onCreate()
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
        placeholder="방 이름을 입력하세요."
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
