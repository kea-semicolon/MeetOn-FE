import React from 'react'

interface TodayEventsProps {
  events: any[]
}

const TodayEvents: React.FC<TodayEventsProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="pl-4 pr-4 pb-2">
        <div className="my-8 mt-2 justify-center rounded-[6px] text-[16px] text-[#959595] flex items-center pt-5 pb-5 w-full h-[56px] bg-white border border-1">
          일정이 존재하지 않습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="pl-4 pr-4 pb-2">
      <div className="overflow-hidden">
        <div className="bg-white border border-gray-200 p-3 rounded-md">
          {events.map((event, index) => (
            <span
              key={event.id}
              className={`flex items-center ${index === events.length - 1 ? '' : 'pb-2 mb-2'}`}
            >
              <span className="text-sm font-medium mr-2">
                {new Date(event.start).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </span>
              <span className="text-sm">{event.title}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodayEvents
