import React, { useCallback, useEffect, useState } from 'react'
import MinutesCalendar from '@/_components/Meeting-minutes/minutesCalendar'
import Toggle from '@/_components/Meeting-minutes/toggle'
import Table from '@/_components/Meeting-minutes/table'

const MeetingMinutes = () => {
  const [isCalendarView, setIsCalendarView] = useState(true)
  const [todayEvents, setTodayEvents] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([]) // State to hold all events

  const handleToggleView = () => {
    setIsCalendarView(!isCalendarView)
  }

  const handleTodayEventsChange = useCallback(
    (schedules: any[]) => {
      setTodayEvents(schedules)
    },
    [setTodayEvents],
  )

  // Handler to update all events from MinutesCalendar
  const handleEventsChange = useCallback(
    (schedules: any[]) => {
      setEvents(schedules)
    },
    [setEvents],
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
          <MinutesCalendar
            onTodayEventsChange={handleTodayEventsChange}
            onEventsChange={handleEventsChange}
          />
        ) : (
          <Table events={events} />
        )}
      </div>
    </div>
  )
}

export default MeetingMinutes
