'use client'

import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import '@/styles/ganttchart.css'

const GanttChart: React.FC = () => {
    const events = [
        {
            start: '2024-04-01',
            end: '2024-04-03',
            resourceId: 'resource1'
        },
        {
            start: '2024-04-05',
            end: '2024-04-07',
            resourceId: 'resource2'
        },
        {
            start: '2024-04-10',
            end: '2024-04-12',
            resourceId: 'resource3'
        }
    ];

    useEffect(() => {
        // 서버와 클라이언트 간의 시차
        const timeOffset = new Date().getTimezoneOffset() * 60000;
        const today = new Date(Date.now() - timeOffset).toISOString().slice(0, 10);
        const todayElements = document.querySelectorAll(`.fc-day[data-date="${today}"]`);
        todayElements.forEach(element => {
            element.classList.add('today-highlight');
        });
    }, []);

    return (
        <div className="gantt-chart">
            <FullCalendar
                schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                plugins={[dayGridPlugin, resourceTimelinePlugin]}
                initialView="resourceTimelineYear"
                //aspectRatio={1.5}
                headerToolbar={{
                    left: 'resourceTimelineMonth,resourceTimelineYear',
                    center: 'title',
                    right: 'prev,next,today'
                }}
                editable={true}
                resourceAreaWidth={'18%'}
                resourceAreaHeaderContent="프로젝트명"
                eventBackgroundColor={'#FFcd00'}
                eventBorderColor={'#FFcd00'}
                events={events}
                resources={[
                    {id: 'resource1', title: '리소스 1'},
                    {id: 'resource2', title: '리소스 2'},
                    {id: 'resource3', title: '리소스 3'}
                ]}
                slotLabelFormat={{
                    weekday: 'short', // 요일
                    day: 'numeric', // 날짜
                }}
                titleFormat={{
                    month: 'long',
                    year: 'numeric'
                }}

                height={350}
                slotMinWidth={28}

                views={{
                    resourceTimelineMonth: {
                        titleFormat: {
                            month: 'long',
                            year: 'numeric'
                        }
                    },
                    resourceTimelineYear: {
                        titleFormat: {
                            year: 'numeric'
                        }
                    }
                }}
            />
        </div>
    );
}

export default GanttChart;