'use client'

import { useState } from 'react'
import { NextPage } from 'next'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const Calendar: NextPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [content, setContent] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [events, setEvents] = useState([])

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                timeZone="UTC"
                aspectRatio={2}
                headerToolbar={{
                    left: 'addEventButton',
                    center: 'title'
                }}
                customButtons={{
                    addEventButton: {
                        text: '일정 추가',
                        click: () => setShowModal(true),
                    },
                }}
                editable={true}
                displayEventTime={false}
                fixedWeekCount={false}
                events={events}

            />

        </div>
    );
};

export default Calendar;
