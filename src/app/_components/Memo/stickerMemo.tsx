'use client'

import Image from 'next/image'
import { DownArrow, UpArrow, Trashcan, Save } from '@/_assets/Icons'
import { useState } from 'react'
import usePostMemo from '@/_hook/usePostMemo'

const StickerMemo = ({ memoContent }: { memoContent: string }) => {
  const [content, setContent] = useState<boolean>(true)
  const [memoText, setMemoText] = useState<string>(memoContent)

  const { mutate: createMemo } = usePostMemo()

  const handleSave = () => {
    createMemo({ content: memoText })
  }

  return (
    <div className="flex flex-col mb-3">
      <div className="relative w-full h-[23px] bg-[#FFF7D8]">
        <button type="button" onClick={handleSave}>
          <Image
            className="absolute opacity-80 right-[40px] top-[7px]"
            src={Save}
            alt="save"
          />
        </button>
        <button type="button">
          <Image
            className="absolute right-7 top-1.5"
            src={Trashcan}
            alt="trashcan"
          />
        </button>
        <button type="button" onClick={() => setContent(!content)}>
          <Image
            className="absolute right-3 top-2"
            src={content ? UpArrow : DownArrow}
            alt="arrow"
          />
        </button>
      </div>
      {content && (
        <textarea
          className="text-[14px] p-3 focus:outline-none w-full h-[183px] bg-[#FFFDE8]"
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
        />
      )}
    </div>
  )
}

export default StickerMemo
