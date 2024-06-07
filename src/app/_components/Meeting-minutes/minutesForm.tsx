import React from 'react'

interface MinutesFormProps {
  eventDetails: {
    title: string
    start: Date
    end: Date
    // 필요한 다른 속성 추가
  }
}

const MinutesForm: React.FC<MinutesFormProps> = ({ eventDetails }) => {
  // 이벤트 시작 및 종료 시간을 가져옵니다.
  const startTime = eventDetails.start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const endTime = eventDetails.end.toLocaleTimeString([], {
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
        <p>
          {startTime} - {endTime}
        </p>
      </div>
      <div className="flex pt-2.5 pb-2.5 justify-center items-center">
        <div className="flex-1 bg-[#ffffff] border border-[#959595] rounded-[3px] mr-2 text-[14px] py-3 px-2.5">
          참여자 리스트
        </div>
        <button className="bg-[#D2FA64] px-5 py-3 text-[14px] rounded-[3px]">
          회의 로그 보기
        </button>
      </div>
      <div>
        <textarea
          className="resize-none mb-1.5 w-full h-96 px-3 py-2 border border-[#959595] rounded-[3px] text-[14px] focus:outline-none"
          placeholder="내용을 입력하세요"
          value={eventDetails.title}
          readOnly
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-[#000000] rounded-[2px] px-5 py-1.5 text-[#D2FA64] text-[14px]">
          삭제
        </button>
      </div>
    </div>
  )
}

export default MinutesForm
