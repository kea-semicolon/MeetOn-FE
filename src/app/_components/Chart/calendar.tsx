'use client'

import { useState } from 'react'
import { NextPage } from 'next'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEventModal from './addEventModal'
import '@/_styles/calendar.css'

interface CalendarProps {
  showAddButton?: boolean
}

const Calendar: NextPage<CalendarProps> = ({ showAddButton = true }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [events, setEvents] = useState<any[]>([])

  const handleSaveEvent = (newEvent: any) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
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
          end: `today${showAddButton ? ',addEventButton' : ''}`,
        }}
        customButtons={{
          addEventButton: {
            text: '',
            click: () => setShowModal(true),
          },
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
        moreLinkText={function (n) {
          return `그 외 ${n}개`
        }}
      />
      {showModal && (
        <AddEventModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  )
}

export default Calendar
