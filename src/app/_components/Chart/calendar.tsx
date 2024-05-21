import React, { useRef, useState } from 'react'
import { NextPage } from 'next'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// eslint-disable-next-line import/no-extraneous-dependencies
import koLocale from '@fullcalendar/core/locales/ko'
import AddEventModal from './addEventModal'
import '@/_styles/calendar.css'

interface CalendarProps {
  showAddButton?: boolean
}

const Calendar: NextPage<CalendarProps> = ({ showAddButton = true }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [events, setEvents] = useState<any[]>([])
  const calendarRef = useRef<any>(null)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const handleSaveEvent = (newEvent: any) => {
    // 이벤트 생성 시 ID 부여
    const eventId = Date.now().toString()

    // eslint-disable-next-line no-param-reassign
    newEvent.id = eventId

    if (selectedEvent) {
      // 선택된 이벤트가 있다면 해당 이벤트를 수정
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
      // 선택된 이벤트가 없다면 새로운 이벤트 추가
      setEvents((prevEvents) => [...prevEvents, newEvent])
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      // 선택된 이벤트와 ID가 같은 이벤트를 제외한 새로운 이벤트 배열 생성
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
      // 회의록 페이지로 이동
      window.location.href = `/meeting-notes/${eventTitle}` // 예시 URL
    }
  }

  const handleAddEventButtonClick = () => {
    setShowModal(false)
    setSelectedEvent(null) // 선택된 이벤트 초기화
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null) // 선택된 이벤트 초기화
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
            text: '',
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
        eventBackgroundColor="#FF7236"
        eventBorderColor="#FF7236"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        editable
        displayEventTime
        fixedWeekCount={false}
        events={events}
        dayMaxEvents={2} // = eventLimit
        moreLinkClassNames={['more-events-link']}
        moreLinkText={(n) => `그 외 ${n}개`}
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
