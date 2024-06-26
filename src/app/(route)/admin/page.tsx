'use client'

import Fix from '@/_components/Fix/fix'
import Admin from '@/_components/Admin/admin'
import { useEffect, useState } from 'react'
import usePostChannel from '@/_hook/usePostChannel'
import useGetMemberInfo from '@/_hook/useGetMemberInfo'
import useGetCodeInfo from '@/_hook/useGetCodeInfo'

export default function AdminPage() {
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
  // Admin 컴포넌트의 mx 값을 동적으로 설정
  const adminStyles = {
    marginLeft: `${windowWidth / 5 - 15}px`, // 화면 너비의 1/5 만큼 왼쪽으로 이동
  }

  return (
    <div className="flex w-full">
      <Fix />
      <div style={adminStyles} className="my-[70px]">
        <Admin />
      </div>
    </div>
  )
}
