import { useState, useRef } from 'react'; // useRef 추가
import { NextPage } from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from './addEventModal';
import '@/_styles/calendar.css';
import koLocale from '@fullcalendar/core/locales/ko';

interface CalendarProps {
  showAddButton?: boolean;
}

const Calendar: NextPage<CalendarProps> = ({ showAddButton = true }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const calendarRef = useRef<any>(null);

  const handleSaveEvent = (newEvent: any) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
      <div className="calendar w-3/5 absolute">
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
                  const calendarApi = calendarRef.current?.getApi();
                  if (calendarApi) {
                    calendarApi.today();
                  }
                }
              }
            }}
            titleFormat={{
              year: 'numeric',
              month: 'long'
            }}
            eventBackgroundColor="#FF7236"
            eventBorderColor="#FF7236"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
            editable={true}
            displayEventTime={true}
            fixedWeekCount={false}
            events={events}
            dayMaxEvents={2} // = eventLimit
            moreLinkClassNames={['more-events-link']}
            moreLinkText={(n) => `그 외 ${n}개`}
            dayHeaderContent={(arg) => {
              const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              return daysOfWeek[arg.date.getDay()];
            }}
            dayHeaderFormat={{ weekday: 'short' }}
            dayCellContent={(arg) => {
              return arg.date.getDate().toString();
            }}
            ref={calendarRef}
        />
        {showModal && (
            <AddEventModal
                onClose={() => setShowModal(false)}
                onSave={handleSaveEvent}
            />
        )}
      </div>
  );
};

export default Calendar;

