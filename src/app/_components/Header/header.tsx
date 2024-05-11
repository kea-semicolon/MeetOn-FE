'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(typeof window !== 'undefined' ? window.location.pathname : '')
  }, [])

  const menuItems = [
    { href: '/main', text: '홈' },
    { href: '/minutes', text: '일정 공유' },
    { href: '/board', text: '게시판' },
    { href: '/메모장', text: '메모장' },
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
    marginRight: `${windowWidth / 7}px`, // 화면 너비의 1/5 만큼 왼쪽으로 이동
  }

  return (
    <div className="flex items-center">
      <a href="/main" className="flex" style={headerStyles}>
        <p className="text-[28px] font-bold text-[#FFCD00]">Meet;</p>
        <p className="text-[28px] font-bold text-[#4D4D4D]">ON</p>
      </a>
      <div className="flex gap-24 text-[16px] font-medium mt-2">
        {menuItems.map((item) => (
          <div key={item.href} className="flex flex-col items-center gap-0.5">
            <a
              href={item.href}
              className={path === item.href ? 'font-bold' : ''}
            >
              {item.text}
            </a>
            {path === item.href && (
              <div className="bg-[#FFCD00] rounded-full w-[6px] h-[6px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
