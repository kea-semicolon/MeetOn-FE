import { useState } from 'react'
import usePostMemo from '@/_hook/usePostMemo'
import { useRouter } from 'next/navigation'

export default function MemoJang({
  setCurrentView,
}: {
  setCurrentView: (view: boolean) => void
}) {
  const [memoText, setMemoText] = useState<string>('')
  const route = useRouter()
  const { mutate: createMemo } = usePostMemo()

  const handleSave = () => {
    createMemo({ content: memoText })
    setCurrentView(true)
  }

  return (
    <div className="flex flex-col">
      <textarea
        placeholder="메모 내용을 입력하세요."
        className="mb-3 focus:outline-0 pl-3 pt-3 rounded-[3px] border border-opacity-50 border-[#959595] mt-4 bg-white w-full h-[405px]"
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="w-[66px] h-[34px] bg-black text-[#D2FA64] ml-auto rounded-[3px]"
      >
        저장
      </button>
    </div>
  )
}
