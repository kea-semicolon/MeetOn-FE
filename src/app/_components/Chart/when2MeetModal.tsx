import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Cancel, ViewCalendarBtn } from '@/_assets/Icons'
import '@/_styles/addEventModal.css'
import usePostWhenToMeet from '@/_hook/usePostWhenToMeet'

interface WhenToMeetModalProps {
  onClose: () => void
  onSave: (event: any) => void
}

const WhenToMeetModal: React.FC<WhenToMeetModalProps> = ({
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

  const postWhenToMeetMutation = usePostWhenToMeet() // 새 일정을 추가하기 위한 훅

  const handleSave = () => {
    if (!startDate || !startTime || !endDate || !endTime || !title) {
      alert('이벤트 이름과 날짜/시간을 모두 입력하세요.')
    } else {
      const startDateTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes(),
      )
      const endDateTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes(),
      )

      if (startDateTime >= endDateTime) {
        alert('시작 시간은 종료 시간보다 이전이어야 합니다.')
      } else {
        postWhenToMeetMutation.mutate({
          title,
          startDate: startDateTime.toISOString(),
          endDate: endDateTime.toISOString(),
          startTime: startDateTime.getTime(),
          endTime: endDateTime.getTime(),
        })
      }
    }
    onClose() // 모달 창 닫기
  }

  // 표 그리기
  const drawTable = () => {
    if (startDate && startTime && endDate && endTime) {
      return (
        <div className="bg-green-200 p-3 rounded-md">
          <p>
            시작 일시: {startDate.toLocaleDateString()}{' '}
            {startTime.toLocaleTimeString()}
          </p>
          <p>
            종료 일시: {endDate.toLocaleDateString()}{' '}
            {endTime.toLocaleTimeString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md border border-gray-200 z-20 w-[548px] h-auto">
        {/* 모달 내용 */}
        <style jsx global>{`
          .react-datepicker__input-container {
            width: 0%;
          }
        `}</style>
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold">회의 스케줄 추가</h1>
          <button onClick={onClose} className="mr-0.5">
            <Image src={Cancel} alt="cancel" />
          </button>
        </div>
        <hr className="my-4 border-gray-300" />

        {/* 이벤트 이름 입력 */}
        <div className="flex mb-[10px] mt-3">
          <div className="w-3/4">
            <textarea
              value={title}
              placeholder="이벤트 이름을 입력하세요"
              className="w-[339] h-[108px] text-[38px] rounded-[2px] border border-[#d9d9d9] mt-[5px] ml-[-12px] inline-block align-top resize-none"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="h-[210px]">
          {/* 시작 날짜 선택 */}
          <div className="flex items-center mb-[10px]">
            <div className="w-1/5 mr-[6px] text-[10px] text-[#636363] text-center ">
              시작 일시 선택
            </div>
            <div className="w-2/5">
              <div className="relative ml-0.5">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="MM월 dd일"
                    placeholderText="시작 날짜 선택"
                    className="text-xs bg-white w-[121px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-1.5 pl-3"
                    formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                  />
                  <button
                    onClick={() => {
                      const datePickerInput = document.querySelector(
                        '.react-datepicker-wrapper input',
                      )
                      if (datePickerInput) {
                        const event = new MouseEvent('click', {
                          bubbles: true,
                          cancelable: true,
                          view: window,
                        })
                        datePickerInput.dispatchEvent(event)
                      }
                    }}
                    className="absolute top-1/2 transform -translate-y-1/2 right-0 border-none bg-none cursor-pointer"
                  >
                    <Image src={ViewCalendarBtn} alt="error" />
                  </button>
                </label>
              </div>
            </div>
            {/* 시작 시간 선택 */}
            <div className="w-2/5">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <DatePicker
                  selected={startTime}
                  onChange={(date: Date | null) => setStartTime(date)}
                  dateFormat="MM월 dd일"
                  placeholderText="시작 시간 선택"
                  className="text-xs bg-white  w-[107px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-1.5 pl-3"
                  formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                  wrapperClassName="react-datepicker-wrapper-end"
                />
                <button
                  onClick={() => {
                    const datePickerInput = document.querySelector(
                      '.react-datepicker-wrapper input',
                    )
                    if (datePickerInput) {
                      const event = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                      })
                      datePickerInput.dispatchEvent(event)
                    }
                  }}
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 border-none bg-none cursor-pointer"
                >
                  <Image src={ViewCalendarBtn} alt="error" />
                </button>
              </label>
            </div>
          </div>

          {/* 종료 날짜 선택 */}
          <div className="flex items-center mb-[10px]">
            <div className="w-1/5 mr-[6px] text-[10px] text-[#636363] text-center">
              종료 일시 선택
            </div>
            <div className="w-2/5">
              <div className="relative ml-0.5">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="MM월 dd일"
                    placeholderText="종료 날짜 선택"
                    className="text-xs bg-white w-[121px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-1.5 pl-3"
                    formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                  />
                  <button
                    onClick={() => {
                      const datePickerInput = document.querySelector(
                        '.react-datepicker-wrapper input',
                      )
                      if (datePickerInput) {
                        const event = new MouseEvent('click', {
                          bubbles: true,
                          cancelable: true,
                          view: window,
                        })
                        datePickerInput.dispatchEvent(event)
                      }
                    }}
                    className="absolute top-1/2 transform -translate-y-1/2 right-0 border-none bg-none cursor-pointer"
                  >
                    <Image src={ViewCalendarBtn} alt="error" />
                  </button>
                </label>
              </div>
            </div>
            {/* 종료 시간 선택 */}
            <div className="w-2/5">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  dateFormat="MM월 dd일"
                  placeholderText="종료 시간 선택"
                  className="text-xs bg-white w-[107px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-1.5 pl-3"
                  formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                  wrapperClassName="react-datepicker-wrapper-end"
                />
                <button
                  onClick={() => {
                    const datePickerInput = document.querySelector(
                      '.react-datepicker-wrapper input',
                    )
                    if (datePickerInput) {
                      const event = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                      })
                      datePickerInput.dispatchEvent(event)
                    }
                  }}
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 border-none bg-none cursor-pointer"
                >
                  <Image src={ViewCalendarBtn} alt="error" />
                </button>
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div>{drawTable()}</div>
        <hr />
        <div className="flex justify-center align-center pt-3">
          <button
            onClick={handleSave}
            className="pl-3.5 pr-3.5 pt-1 pb-1 rounded-[2px] bg-[#ffffff] text-[14px]"
          >
            확인
          </button>
        </div>
      </div>
    </>
  )
}

export default WhenToMeetModal
