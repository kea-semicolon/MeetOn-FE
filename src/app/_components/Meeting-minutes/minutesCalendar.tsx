import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import useGetSchedule from '@/_hook/useGetSchedule'
// eslint-disable-next-line import/no-extraneous-dependencies
import koLocale from '@fullcalendar/core/locales/ko'
import WhenToMeetModal from '@/_components/Chart/when2MeetModal'
import '@/_styles/minutesCalendar.css'
import MeetingMinutesList from '@/_components/Meeting-minutes/meetingMinutesList' // 추가된 부분
import MinutesForm from './minutesForm'

interface CalendarProps {
  onTodayEventsChange: (events: any[]) => void
}

const MinutesCalendar: NextPage<CalendarProps> = ({ onTodayEventsChange }) => {
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const calendarRef = useRef<any>(null)
  const [showWhen2meetModal, setShowWhen2meetModal] = useState<boolean>(false)

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const { data } = useGetSchedule(currentYear, currentMonth)

  useEffect(() => {
    if (data?.result) {
      console.log('Fetched schedule list:', data.result)
      const schedules = data.result.map((schedule) => ({
        id: schedule.scheduleId,
        title: schedule.title,
        start: schedule.startTime,
        end: schedule.endTime,
      }))
      setEvents(schedules)
    }
  }, [data])

  useEffect(() => {
    const today = new Date()
    const isToday = (date: Date) => {
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      )
    }

    const filteredEvents = events.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      return (
        isToday(eventStart) ||
        isToday(eventEnd) ||
        (eventStart < today && eventEnd > today)
      )
    })
    onTodayEventsChange(filteredEvents)
  }, [events, onTodayEventsChange])

  const handleEventClick = (clickInfo: any) => {
    const clickedEvent = clickInfo.event
    const scheduleId = clickedEvent.id
    console.log('Selected event scheduleId:', scheduleId)
    setSelectedEvent(clickedEvent)
  }

  const handleCloseWhenToMeetModal = () => {
    setShowWhen2meetModal(false)
  }

  const handleSaveWhenToMeet = () => {}

  return (
    <div className="MinutesCalendar w-full">
      {selectedEvent ? (
        <div>
          <MinutesForm eventDetails={selectedEvent} />
          {/*
          <button onClick={() => setSelectedEvent(null)}>이전</button>
          */}
        </div>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            timeZone="local"
            aspectRatio={2}
            headerToolbar={{
              left: 'prev,title,next',
              end: 'todayButton,when2meetButton',
            }}
            locale={koLocale}
            customButtons={{
              todayButton: {
                text: 'Today',
                click: () => {
                  const calendarApi = calendarRef.current?.getApi()
                  if (calendarApi) {
                    calendarApi.today()
                  }
                },
              },
              when2meetButton: {
                text: '',
                click: () => {
                  setShowWhen2meetModal(true)
                },
              },
            }}
            titleFormat={{
              year: 'numeric',
              month: 'long',
            }}
            eventBackgroundColor="#000000"
            eventBorderColor="#000000"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
            editable
            displayEventTime
            eventDisplay="block"
            fixedWeekCount={false}
            events={events}
            dayMaxEvents={1}
            moreLinkClassNames={['more-events-link']}
            moreLinkText={(n) => `그 외 ${n}개`}
            dayHeaderContent={(arg) => {
              const daysOfWeek = [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
              ]
              return daysOfWeek[arg.date.getDay()]
            }}
            dayHeaderFormat={{ weekday: 'short' }}
            dayCellContent={(arg) => {
              return arg.date.getDate().toString()
            }}
            ref={calendarRef}
            eventClick={handleEventClick}
          />
          <MeetingMinutesList />
        </>
      )}
      {showWhen2meetModal && (
        <WhenToMeetModal
          onClose={handleCloseWhenToMeetModal}
          onSave={handleSaveWhenToMeet}
        />
      )}
    </div>
  )
}

export default MinutesCalendar
