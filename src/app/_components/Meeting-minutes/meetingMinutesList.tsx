const MeetingMinutesList: React.FC<{ events: any[] }> = ({ events }) => {
  const today = new Date()
  const weekdays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  const weekday = weekdays[today.getDay()]
  const month = today.toLocaleString('default', { month: 'long' })
  const day = today.getDate()

  const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours %= 12
    hours = hours || 12 // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? `0${minutes}` : minutes
    return `${ampm} ${hours}:${strMinutes}`
  }

  return (
    <div className="pt-8">
      <p className="text-[18px] font-normal ml-1 pb-4">{`${month} ${day}일 ${weekday}`}</p>
      {events.length > 0 ? (
        <div className="rounded-[6px] border border-[#959595] bg-[#ffffff]">
          <table className="w-full">
            <tbody>
              {events.map((event, index) => {
                const eventDate = new Date(event.start)
                const eventTime = formatTime(eventDate)

                return (
                  <tr key={event.id} className="">
                    <td
                      className={`w-1/5 border-r border-[#959595] ${index !== events.length - 1 ? 'border-b' : ''}`}
                    >
                      <p className="text-[16px] text-center">{eventTime}</p>
                    </td>
                    <td
                      className={`py-4 w-4/5 ${index !== events.length - 1 ? 'border-b border-[#959595]' : ''}`}
                    >
                      <p className="text-[16px] pl-3.5">{event.title}</p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-8 mt-2 justify-center rounded-[6px] text-[16px] text-[#959595] flex items-center pl-3 pr-2 pt-3 pb-2 w-full h-[56px] bg-white border border-[#959595]">
          회의록이 존재하지 않습니다.
        </div>
      )}
    </div>
  )
}

export default MeetingMinutesList
