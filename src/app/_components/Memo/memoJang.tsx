import { useEffect, useState } from 'react'
import usePostMemo from '@/_hook/usePostMemo'
import usePutMemo from '@/_hook/usePutMemo'
import useGetMemo from '@/_hook/useGetMemo'

export default function MemoJang({
  setCurrentView,
  selectedContent,
}: {
  setCurrentView: (view: boolean) => void
  selectedContent: string
}) {
  const [memoText, setMemoText] = useState<string>('')
  const [selectedMemoId, setSelectedMemoId] = useState<number | null>(null)
  const { mutate: createMemo } = usePostMemo()
  const updateMemoMutation = usePutMemo()
  const { data: Memo } = useGetMemo()

  useEffect(() => {
    setMemoText(selectedContent)
  }, [selectedContent])
  useEffect(() => {
    if (Memo?.memoList) {
      console.log(Memo.memoList)
      if (Memo.memoList.length > 0) {
        setSelectedMemoId(Memo.memoList[0].memoId)
      }
    }
  }, [Memo])

  const handleSave = () => {
    createMemo({ content: memoText })
    setCurrentView(true)
  }
  const handleUpdate = async () => {
    try {
      if (selectedMemoId !== null) {
        await updateMemoMutation.mutateAsync({
          memoId: selectedMemoId,
          content: memoText,
        })
      } else {
        console.error('No memoId selected for update')
      }
    } catch (error) {
      console.error('Error updating memo:', error)
    }
  }

  return (
    <div className="flex flex-col">
      <textarea
        placeholder="메모 내용을 입력하세요."
        className="mb-3 focus:outline-0 pl-3 pt-3 rounded-[3px] border border-opacity-50 border-[#959595] mt-4 bg-white w-full h-[405px]"
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
      />
      <div className="flex ">
        <button
          onClick={handleUpdate}
          className="w-[66px] h-[34px] bg-black text-[#D2FA64] ml-auto rounded-[3px]"
        >
          수정
        </button>
        <button
          onClick={handleSave}
          className="w-[66px] h-[34px] bg-black text-[#D2FA64] ml-3 rounded-[3px]"
        >
          저장
        </button>
      </div>
    </div>
  )
}
