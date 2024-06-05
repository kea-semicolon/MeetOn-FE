import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import useGetSchedule from '@/_hook/useGetSchedule'
// eslint-disable-next-line import/no-extraneous-dependencies
import koLocale from '@fullcalendar/core/locales/ko'
import AddEventModal from './addEventModal'
import '@/_styles/calendar.css'

interface CalendarProps {
  showAddButton?: boolean
  onTodayEventsChange: (events: any[]) => void
}

const DisplayMoreEventsModal = ({ events, onClose }) => {
  return (
    <div className="display-more-events-modal">
      <h2>All Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.title}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

const Calendar: NextPage<CalendarProps> = ({
  showAddButton = true,
  onTodayEventsChange,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [events, setEvents] = useState<any[]>([])
  const calendarRef = useRef<any>(null)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const { data } = useGetSchedule(currentYear, currentMonth)

  const handleMoreLinkClick = (info) => {
    const { allSegs } = info
    const allEvents = allSegs.map((seg) => seg.event)
    setEvents(allEvents)
    setShowModal(true)
  }

  useEffect(() => {
    if (data?.result) {
      console.log('Fetched user list:', data.result)
      const schedules = data.result.map((schedule) => ({
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

  const handleSaveEvent = (newEvent: any) => {
    const eventId = Date.now().toString()
    // eslint-disable-next-line no-param-reassign
    newEvent.id = eventId

    if (selectedEvent) {
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) => {
          if (event.id === selectedEvent.id) {
            return { ...event, ...newEvent }
          }
          return event
        })
        return updatedEvents
      })
    } else {
      setEvents((prevEvents) => [...prevEvents, newEvent])
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEvent.id,
      )
      setEvents(updatedEvents)
    }
    setShowModal(false)
  }

  const handleEventClick = (clickInfo: any) => {
    const clickedEvent = clickInfo.event
    const isHomePage = window.location.pathname === '/main'
    if (isHomePage) {
      setSelectedEvent(clickedEvent)
      setShowModal(true)
    } else {
      const eventTitle = clickedEvent.title
      window.location.href = `/meeting-notes/${eventTitle}`
    }
  }

  const handleAddEventButtonClick = () => {
    setShowModal(false)
    setSelectedEvent(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
    setShowModal(false)
  }

  return (
    <div className="calendar w-full">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        timeZone="local"
        aspectRatio={2}
        headerToolbar={{
          left: 'prev,title,next',
          end: `todayButton${showAddButton ? ',addEventButton' : ''}`,
        }}
        locale={koLocale}
        customButtons={{
          addEventButton: {
            text: '+ 일정추가',
            click: () => setShowModal(true),
          },
          todayButton: {
            text: 'Today',
            click: () => {
              const calendarApi = calendarRef.current?.getApi()
              if (calendarApi) {
                calendarApi.today()
              }
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
        moreLinkClick={(info) => {
          const { date, allSegs } = info
          info.jsEvent.preventDefault()
          console.log('Clicked date:', date)
          console.log('All segments:', allSegs)

          // 여기에 모달을 열고 사용자 정의 동작을 수행하는 코드를 추가합니다.
          // 예: openCustomModal(allSegs);
        }}
        dayHeaderContent={(arg) => {
          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          return daysOfWeek[arg.date.getDay()]
        }}
        dayHeaderFormat={{ weekday: 'short' }}
        dayCellContent={(arg) => {
          return arg.date.getDate().toString()
        }}
        ref={calendarRef}
        eventClick={handleEventClick}
      />
      {showModal && (
        <AddEventModal
          onClose={handleCloseModal}
          selectedEvent={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  )
}

export default Calendar
