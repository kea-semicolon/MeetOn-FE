'use client'

import { useState } from 'react'
import Image from 'next/image'
import blank from '@/_assets/Icons/blank.svg'

export default function Signup() {
  const [image, setImage] = useState<string>('/blank.png')
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-[513px] h-[440px] shadow-md ">
        <Image
          className="w-[140px] mx-auto mb-6 mt-16"
          src={blank}
          alt="blank"
        />
        <div className="w-[186px] mx-auto">
          <input
            className="outline-none flex text-center h-[31px] text-[16px]"
            placeholder="사용자 이름"
          />
          <hr />
        </div>
        <div className="flex gap-3 justify-center mt-12">
          <button
            type="button"
            className="rounded-[6px] border text-[#FFCD00] text-center border-[#FFCD00] w-[148px] h-[50px]"
          >
            방 만들기
          </button>
          <button
            type="button"
            className="rounded-[6px] text-[#FFFFFF] text-center bg-[#FFCD00] w-[148px] h-[50px]"
          >
            참여하기
          </button>
        </div>
      </div>
    </div>
  )
}
