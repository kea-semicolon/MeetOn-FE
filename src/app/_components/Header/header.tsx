import { useEffect, useState } from 'react'

export default function Header() {
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(typeof window !== 'undefined' ? window.location.pathname : '')
  }, [])

  const menuItems = [
    { href: '/main', text: '홈' },
    { href: '/일정공유', text: '일정 공유' },
    { href: '/게시판', text: '게시판' },
    { href: '/메모장', text: '메모장' },
    { href: '/회의관리', text: '회의 관리' },
  ]

  return (
    <div className="flex items-center">
      <div className="flex mr-48">
        <p className="text-[28px] font-bold text-[#FFCD00]">Meet;</p>
        <p className="text-[28px] font-bold text-[#4D4D4D]">ON</p>
      </div>
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
