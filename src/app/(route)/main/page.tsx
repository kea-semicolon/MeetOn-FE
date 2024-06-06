'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Fix from '@/_components/Fix/fix'
import Calendar from '@/_components/Chart/calendar'
import TodayEvents from '@/_components/Chart/todayEvents'
import MemoPage from '@/_components/Memo/memopage'

export default function MainPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [todayEvents, setTodayEvents] = useState<any[]>([])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleTodayEventsChange = useCallback(
    (events: any[]) => {
      setTodayEvents(events)
    },
    [setTodayEvents],
  )

  const mainStyles = {
    marginLeft: `${windowWidth / 5 - 13}px`, // 화면 너비의 1/5 만큼 왼쪽으로 이동
  }

  return (
    <div className="flex w-full">
      <Fix />
      <div
        style={mainStyles}
        className="my-[70px] w-3/5 h-screen relative bg-[#F8F9FB]"
      >
        <p className="px-6 py-4 text-[20px] font-bold">캘린더</p>
        <div className="pl-4 pr-4 pb-4">
          <Calendar onTodayEventsChange={handleTodayEventsChange} />
        </div>
        <p className="px-6 pt-3 pb-3 text-[20px] font-bold">오늘의 일정</p>
        <div className="">
          <TodayEvents events={todayEvents} />
        </div>
      </div>
    </div>
  )
}
