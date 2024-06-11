import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import useGetMinutes from '@/_hook/useGetMinutes'
import useGetWhenToMeet from '@/_hook/useGetWhenToMeet'
// eslint-disable-next-line import/no-extraneous-dependencies
import koLocale from '@fullcalendar/core/locales/ko'
import WhenToMeetModal from '@/_components/Meeting-minutes/when2MeetModal'
import '@/_styles/minutesCalendar.css'
import MeetingMinutesList from '@/_components/Meeting-minutes/meetingMinutesList'
import { MinutesInfo } from '@/_types'
import MinutesForm from './minutesForm'

interface CalendarProps {
  onTodayEventsChange: (events: any[]) => void
  onEventsChange: (events: any[]) => void // Add this line
}

const MinutesCalendar: NextPage<CalendarProps> = ({
  onTodayEventsChange,
  onEventsChange,
}) => {
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const calendarRef = useRef<any>(null)
  const [showWhen2meetModal, setShowWhen2meetModal] = useState<boolean>(false)

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const { data: minutesData } = useGetMinutes()
  const { data: whenToMeetData, refetch: refetchWhenToMeet } =
    useGetWhenToMeet() // Use the hook

  useEffect(() => {
    if (minutesData?.result) {
      console.log('Fetched minutes list:', minutesData.result)
      const newEvents = minutesData.result.map((meeting: MinutesInfo) => ({
        id: meeting.meetingId,
        title: '회의록',
        start: meeting.createdDate,
        end: meeting.createdDate,
        content: meeting.content,
      }))
      console.log('new events : ', newEvents)
      setEvents(newEvents)
      onEventsChange(newEvents) // Call the handler with the fetched events
    }
  }, [minutesData, onEventsChange])

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
    const { content } = clickedEvent.extendedProps
    console.log('Selected minutes id :', scheduleId)
    console.log('Selected minutes content :', content)
    setSelectedEvent({
      id: scheduleId,
      title: clickedEvent.title,
      start: clickedEvent.start,
      end: clickedEvent.end,
      content,
    })
  }

  const handleCloseWhenToMeetModal = () => {
    setShowWhen2meetModal(false)
  }

  const handleSaveWhenToMeet = () => {}

  const handleWhenToMeetButtonClick = async () => {
    try {
      const result = await refetchWhenToMeet() // Refetch data from server
      if (result.data) {
        console.log('WhenToMeet data exists :', result.data)
      } else {
        console.log('No WhenToMeet data found')
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized access - please check your credentials.')
      } else {
        console.log('An error occurred:', error.message)
      }
    }
    setShowWhen2meetModal(true)
  }

  return (
    <div className="MinutesCalendar w-full">
      {selectedEvent ? (
        <div>
          <MinutesForm eventDetails={selectedEvent} />
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
                click: handleWhenToMeetButtonClick, // Handle button click
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
