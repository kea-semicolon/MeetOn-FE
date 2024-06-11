'use client'

import Image from 'next/image'
import { DownArrow, UpArrow, Trashcan, Save } from '@/_assets/Icons'
import { useEffect, useState } from 'react'
import usePostMemo from '@/_hook/usePostMemo'
import useDeleteMemo from '@/_hook/useDeleteMemo'
import useGetMemo from '@/_hook/useGetMemo'
import DeleteMemoModal from '@/_components/Memo/deleteMemoModal'

const StickerMemo = ({ memoContent }: { memoContent: string }) => {
  const { handleDelete, handleDeleteClick, handleCloseModal, showDeleteModal } =
    useDeleteMemo()
  const [content, setContent] = useState<boolean>(true)
  const [memoText, setMemoText] = useState<string>(memoContent)
  const [selectedMemoId, setSelectedMemoId] = useState<number | null>(null)
  const { mutate: createMemo } = usePostMemo()
  const { data: Memo } = useGetMemo()

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
  }

  return (
    <div className="flex flex-col mb-3">
      <div className="relative w-full h-[23px] bg-[#FCFFD3] bg-opacity-90">
        <button type="button" onClick={() => setContent(!content)}>
          <Image
            className="mt-0.5 ml-2"
            src={content ? UpArrow : DownArrow}
            alt="arrow"
          />
        </button>
        <button type="button" onClick={handleSave}>
          <Image
            className="absolute opacity-80 right-[25px] top-[5.8px]"
            src={Save}
            alt="save"
          />
        </button>
        <button type="button" onClick={handleDeleteClick}>
          <Image
            className="absolute right-2 top-0.5"
            src={Trashcan}
            alt="trashcan"
          />
        </button>
      </div>
      {content && (
        <textarea
          className="text-[14px] p-3 focus:outline-none w-full h-[183px] bg-opacity-90 bg-[#FDFFE8]"
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
        />
      )}
      {showDeleteModal && (
        <DeleteMemoModal
          onClose={handleCloseModal}
          onDelete={() => handleDelete(Number(selectedMemoId))}
        />
      )}
    </div>
  )
}

export default StickerMemo
