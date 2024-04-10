'use client'

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const GanttChart: React.FC = () => {
    const events = [
        {
            //title: '이벤트 1',
            start: '2024-04-01',
            end: '2024-04-03',
            resourceId: 'resource1'
        },
        {
            //title: '이벤트 2',
            start: '2024-04-05',
            end: '2024-04-07',
            resourceId: 'resource2'
        },
        {
            //title: '이벤트 3',
            start: '2024-04-10',
            end: '2024-04-12',
            resourceId: 'resource3'
        }
    ];

    return (
        <div>
            <style jsx global>{`
                .fc-timeline-event {
                    border-radius: 8px;
               
                }
                

            `}</style>


            <FullCalendar
                schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                plugins={[dayGridPlugin, resourceTimelinePlugin]}
                initialView="resourceTimelineMonth"
                aspectRatio={1.5}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'resourceTimelineMonth,resourceTimelineYear'
                }}
                editable={true}
                resourceAreaHeaderContent="프로젝트명"
                //resources="https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors"
                //events="https://fullcalendar.io/api/demo-feeds/events.json?single-day&for-resource-timeline"
                eventBackgroundColor={'#FFcd00'}
                eventBorderColor={'#FFcd00'}
                events={events}
                resources={[
                    {id: 'resource1', title: '리소스 1'},
                    {id: 'resource2', title: '리소스 2'},
                    {id: 'resource3', title: '리소스 3'}
                ]}

                slotLabelFormat={{
                    day: 'numeric',
                    month: 'short'

                }}

                // 타이틀 포맷 설정
                titleFormat={{
                    month: 'long',
                    year: 'numeric'
                }}
            />
        </div>
    );
}

export default GanttChart;
