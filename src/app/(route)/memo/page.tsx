'use client'

import Image from 'next/image'
import { DeleteUser } from '@/_assets/Icons'
import useGetMember from '@/_hook/useGetMember'
import Fix from '@/_components/Fix/fix'
import Admin from '@/_components/Admin/admin'
import { useEffect, useState } from 'react'
import MemoPage from '@/_components/Memo/memopage'

export default function Memo() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const adminStyles = {
    marginLeft: `${windowWidth / 5 - 13}px`, // 화면 너비의 1/5 만큼 왼쪽으로 이동
  }
  return (
    <div className="flex w-full">
      <Fix />
      <div style={adminStyles} className="my-[70px]">
        <MemoPage />
      </div>
    </div>
  )
}
