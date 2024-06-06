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
        <button type="button">
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
    </div>
  )
}

export default StickerMemo
