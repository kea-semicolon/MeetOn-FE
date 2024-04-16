'use client'

import StickerMemo from '@/_components/Memo/stickerMemo'
import Image from 'next/image'
import { Plus } from '@/_assets/Icons'
import { useState } from 'react'

export default function MemoZone() {
  const [memoCount, setMemoCount] = useState(2)
  const addMemo = () => {
    setMemoCount((prevCount) => prevCount + 1)
  }
  const renderMemos = () => {
    const memos = []
    for (let i = 0; i < memoCount; i++) {
      memos.push(<StickerMemo key={i} />)
    }
    return memos
  }
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
