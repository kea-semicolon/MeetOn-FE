import React, { useCallback, useEffect, useState } from 'react'
import MeetingMinutesList from '@/_components/Meeting-minutes/meetingMinutesList'
import Toggle from '@/_components/Meeting-minutes/toggle'
import MinutesCalendar from '@/_components/Meeting-minutes/minutesCalendar'
import Table from './table'

const MeetingMinutes = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isCalendarView, setIsCalendarView] = useState(true)
  const [todayEvents, setTodayEvents] = useState<any[]>([])

  const handleToggleView = () => {
    setIsCalendarView(!isCalendarView)
  }

  const handleTodayEventsChange = useCallback(
    (events: any[]) => {
      setTodayEvents(events)
    },
    [setTodayEvents],
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array to ensure this effect only runs once

  return (
    <div className="w-3/5 h-full absolute bg-[#F8F9FB]">
      <div className="flex justify-between">
        <p className="text-[20px] font-bold pl-6 pt-4">회의록</p>
        <div className="flex justify-end px-6 py-4">
          <Toggle onToggle={handleToggleView} />
        </div>
      </div>
      <div className="pl-4 pr-4 pb-4">
        {isCalendarView ? (
          <MinutesCalendar onTodayEventsChange={handleTodayEventsChange} />
        ) : (
          <Table events={todayEvents} />
        )}
      </div>
    </div>
  )
}

export default MeetingMinutes
