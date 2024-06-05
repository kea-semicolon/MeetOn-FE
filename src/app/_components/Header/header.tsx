'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import logo from '@/_assets/Images/mainlogo.png'

export default function Header() {
  const [path, setPath] = useState('')
  const router = useRouter()

  useEffect(() => {
    setPath(typeof window !== 'undefined' ? window.location.pathname : '')
  }, [])

  const menuItems = [
    { href: '/main', text: '홈' },
    { href: '/minutes', text: '일정 공유' },
    { href: '/게시판', text: '게시판' },
    { href: '/memo', text: '메모장' },
    { href: '/admin', text: '회의 관리' },
  ]

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
  const headerStyles = {
    marginRight: `${windowWidth / 7}px`, // 화면 너비의 1/7 만큼 오른쪽으로 이동
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="flex items-center">
      <div className="flex" style={headerStyles}>
        <Image src={logo} alt="logo" className="w-[121px]" />
      </div>
      <div className="flex gap-24 text-[16px] font-medium mt-2">
        {menuItems.map((item) => (
          <div
            key={item.href}
            className="flex flex-col items-center gap-0.5 cursor-pointer"
            onClick={() => handleNavigation(item.href)}
          >
            <p className={path === item.href ? 'font-bold' : 'text-[#959595]'}>
              {item.text}
            </p>
            {path === item.href && (
              <div className="w-[56px] h-[1.5px] bg-black" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
