'use client'

import StickerMemo from '@/_components/Memo/stickerMemo'
import Image from 'next/image'
import { Plus } from '@/_assets/Icons'
import { useEffect, useState } from 'react'
import useGetMemo from '@/_hook/useGetMemo'
import { MemoInfo } from '@/_types'

export default function MemoZone() {
  const { data } = useGetMemo()
  const [memoList, setMemoList] = useState<MemoInfo[]>(data?.memoList || [])

  const addMemo = () => {
    const newMemo: MemoInfo = {
      content: '',
      createdDate: new Date().toISOString(),
      memoId: memoList.length + 1,
    }
    setMemoList((prevMemos) => [newMemo, ...prevMemos])
  }

  const renderMemos = () => {
    if (memoList.length === 0) {
      return <StickerMemo key="default-empty-memo" memoContent="" />
    }
    return memoList.map((memo) => (
      <StickerMemo key={memo.memoId} memoContent={memo.content} />
    ))
  }

  useEffect(() => {
    if (data?.memoList) {
      const sortedMemos = data.memoList.sort((a, b) => b.memoId - a.memoId)
      setMemoList(sortedMemos)
    } else {
      setMemoList([])
    }
  }, [data])

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-3">
        <h2 className="ml-2 text-[20px]">메모</h2>
        <button type="button" onClick={addMemo}>
          <Image src={Plus} alt="plus" />
        </button>
      </div>
      {renderMemos()}
    </div>
  )
}
