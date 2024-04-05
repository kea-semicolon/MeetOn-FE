'use client'

import {useState} from 'react';
import {NextPage} from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from './addEventModal';

interface CalendarProps {
    showAddButton?: boolean;
}

const Calendar: NextPage<CalendarProps> = ({showAddButton = true}) => {
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState<any[]>([]);


    const handleSaveEvent = (newEvent: any) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };


    return (
        <div>

            {/* fullcalendar css */}
            <style jsx global>{`

                .fc-toolbar h2 {
                    display: inline !important;
                }
                
                .fc-today-button {
                    background-color: #ffffff !important;
                    border-color: #d9d9d9 !important;
                    border-radius: 3px !important;
                    width: 72px !important;
                    height: 28px !important;
                    color: black !important;;
                    font-size: x-small !important;
                    margin: 10px 8px 7px 0 !important;

                }
                
                .fc-prev-button {
                    margin: 0 6px 10px 0 !important;
                    width: 28px !important;
                    height: 28px !important;
                    background-color: #F8F8F8 !important;
                    border-color: #d5d5d5 !important;
                    color: #757575 !important;
                    border-radius: 5px !important;
                    font-size: x-small !important;

                }

                .fc-next-button {
                    padding-right: 10% !important;
                    margin: 0 10px 10px 5px !important;
                    width: 28px !important;
                    height: 28px !important;
                    background-color: #F8F8F8 !important;
                    border-color: #d5d5d5 !important;
                    color: #757575 !important;
                    border-radius: 5px !important;
                    font-size: x-small !important;
                }

                .fc-toolbar-title {
                    // width: 150px !important
                    font-weight: bold;
                    font-size: x-large !important;
                    margin: 2% !important;
                }

                .fc-addEventButton-button {
                    margin : 7px 13px 0 3px !important;
                    background-color: #FEE2D7 !important;
                    
                    border: none !important;
                    width: 32px !important;
                    height : 32px !important;
                    color : #FF6D37 !important; ;
                    font-size: small !important;
                    border-radius: 50% !important;
                   
                }
                
                .fc-header-toolbar {
                    height : 58px !important;
                }


                .fc .fc-toolbar.fc-header-toolbar {
                    padding: 2% 0 0 2% !important;
                    
                }

                .fc th {
                    border-top: 1px solid #d9d9d9 !important;
                }

                { /* 캘린더 오른쪽 선 */  }
                .fc-theme-standard td, .fc-theme-standard th {
                    border-right-style: hidden !important;
                }

                { /* 캘린더 아래쪽 선 */  }
                .fc-theme-standard td {
                    border-bottom-style: hidden !important;
                }

                { /* 내부 격자*/  }
                .fc .fc-daygrid-day {
                    border: 0.5px solid #d9d9d9 !important;
                }

                { /* 테두리 */  }
                .fc .fc-scrollgrid {
                    border: none !important;
                }

                { /* 컨테이너 */  }
                .fc {
                    border: 1px solid #d9d9d9 !important;
                    border-radius: 10px !important;
                    box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.05);
                !important;
                }
            `}</style>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                timeZone="UTC"
                aspectRatio={2}
                headerToolbar={{
                    left : 'prev,title,next',
                    end: 'today' + (showAddButton ? ',addEventButton' : ''),
                }}
                customButtons={{
                    addEventButton: {
                        text: '+',
                        click: () => setShowModal(true),
                    }
                }}
                editable={true}
                displayEventTime={false}
                fixedWeekCount={false}
                events={events}
                dayMaxEvents={2} // = eventLimit


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
