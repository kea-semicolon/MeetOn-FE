'use client'

import Image from 'next/image'
import { DownArrow, UpArrow } from '@/_assets/Icons'
import { useState } from 'react'

const StickerMemo = () => {
  const [content, setContent] = useState<boolean>(true)
  return (
    <div className="flex flex-col">
      <div className="absolute w-[240px] h-[23px] bg-[#FFCD00] bg-opacity-20">
        <button type="button" onClick={() => setContent(!content)}>
          <Image
            className="absolute right-3 top-2"
            src={content ? UpArrow : DownArrow}
            alt="downarrow"
          />
        </button>
      </div>
      {content && (
        <textarea className="text-[10px] p-2 focus:outline-none mt-[23px] w-[240px] h-[183px] bg-[#FFCD00] bg-opacity-10" />
      )}
    </div>
  )
}

export default StickerMemo
