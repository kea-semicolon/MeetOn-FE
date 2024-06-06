import Calendar from '@/_components/Chart/calendar'
import MeetingMinutesList from '@/_components/Meeting-minutes/meetingMinutesList'
import Toggle from '@/_components/Meeting-minutes/toggle'
import Table from '@/_components/Meeting-minutes/table'
import React, { useCallback, useEffect, useState } from 'react'

const MeetingMinutes = () => {
  const [isCalendarView, setIsCalendarView] = useState(true)

  const handleToggleView = () => {
    setIsCalendarView(!isCalendarView)
  }

  const [todayEvents, setTodayEvents] = useState<any[]>([])

  const handleTodayEventsChange = useCallback(
    (events: any[]) => {
      setTodayEvents(events)
    },
    [setTodayEvents],
  )

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
          <Calendar
            onTodayEventsChange={handleTodayEventsChange}
            showAddButton={false}
          />
        ) : (
          <Table />
        )}
      </div>
      <MeetingMinutesList />
    </div>
  )
}

export default MeetingMinutes
