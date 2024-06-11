import React from 'react'

interface EventDetails {
  title: string
  start: string
  end: string
  content: string
}

interface MinutesFormProps {
  eventDetails: EventDetails
}

const MinutesForm: React.FC<MinutesFormProps> = ({ eventDetails }) => {
  const startTime = new Date(eventDetails.start).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="">
      <div className="flex px-3 py-2 border border-[#959595] rounded-[3px] text-[14px]">
        <input
          type="text"
          className="flex-1 focus:outline-none"
          placeholder="제목"
          value={eventDetails.title}
          readOnly
        />
        <p>{startTime}</p>
      </div>
      <div className="pt-3">
        <textarea
          className="resize-none mb-1.5 w-full h-96 px-3 py-2 border border-[#959595] rounded-[3px] text-[14px] focus:outline-none"
          placeholder="내용을 입력하세요"
          value={eventDetails.content}
          readOnly
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-[#D2FA64] border border-black px-5 py-3 text-[14px] rounded-[3px] mr-2">
          회의 로그 보기
        </button>
        <button className="bg-[#000000] rounded-[2px] px-5 py-1.5 text-[#D2FA64] text-[14px]">
          삭제
        </button>
      </div>
    </div>
  )
}

export default MinutesForm
