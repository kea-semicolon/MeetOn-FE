'use client'

import Image from 'next/image'
import {
  DownArrow,
  UpArrow,
  Pin,
  Trashcan,
  Rectangle,
  Save,
} from '@/_assets/Icons'
import { useState } from 'react'
import usePostMemo from '@/_hook/usePostMemo'

const StickerMemo = () => {
  const [content, setContent] = useState<boolean>(true)
  const [pin, setPin] = useState<boolean>(false)
  const [memoText, setMemoText] = useState<string>('')
  const { mutate: createMemo } = usePostMemo()

  const handleSave = () => {
    createMemo({ content: memoText }) // Save memoText to the server
  }

  return (
    <div className="flex flex-col mb-3">
      <div className="relative w-full h-[23px] bg-[#FFCD00] bg-opacity-20">
        <button type="button" onClick={() => setPin(!pin)}>
          <Image
            className="absolute left-3 top-1.5"
            src={pin ? Pin : Rectangle}
            alt="pin"
          />
        </button>
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
          className="text-[10px] p-2 focus:outline-none w-full h-[183px] bg-[#FFCD00] bg-opacity-10"
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
        />
      )}
    </div>
  )
}

export default StickerMemo
