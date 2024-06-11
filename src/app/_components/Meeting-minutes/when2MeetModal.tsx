import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { useTableDragSelect } from 'use-table-drag-select'
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
  const [eventName, setEventName] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [tableRows, setTableRows] = useState<number[]>([])

  const [isDragging, setIsDragging] = useState<boolean>(false)

  const postWhenToMeetMutation = usePostWhenToMeet() // 새 일정을 추가하기 위한 훅

  const tableRef = useRef<HTMLTableElement>(null)
  const [ref, value] = useTableDragSelect()

  const startDatePickerRef = useRef<DatePicker | null>(null)
  const startTimePickerRef = useRef<DatePicker | null>(null)
  const endDatePickerRef = useRef<DatePicker | null>(null)
  const endTimePickerRef = useRef<DatePicker | null>(null)

  useEffect(() => {
    if (tableRef.current) {
      const [ref, value] = useTableDragSelect(tableRef.current)
      ref.current?.addEventListener('mousedown', handleMouseDown)
      ref.current?.addEventListener('mouseup', handleMouseUp)

      const onSelectHandler = (selectedCells: any) => {
        console.log(selectedCells)
        // 여기에 선택된 셀에 대한 처리를 추가할 수 있어요.
      }

      ref.current?.addEventListener('mouseup', () => {
        onSelectHandler(value)
      })

      return () => {
        ref.current?.removeEventListener('mousedown', handleMouseDown)
        ref.current?.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [tableRef])

  const handleSave = () => {
    if (!startDate || !startTime || !endDate || !endTime || !eventName) {
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
        const durationInMinutes =
          (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60)
        const numberOfRows = Math.ceil(durationInMinutes / 30) // 30분 간격으로 행 계산
        setTableRows(
          Array.from({ length: numberOfRows }, (_, index) => index + 1),
        ) // 행 배열 설정

        // 필요한 형식으로 날짜와 시간 변환
        const formattedStartDate = startDate.toISOString().split('T')[0]
        const formattedEndDate = endDate.toISOString().split('T')[0]
        const formattedStartTime = startTime.getHours()
        const formattedEndTime = endTime.getHours()

        postWhenToMeetMutation.mutate({
          eventName,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        })
      }
    }
    onClose() // 모달 창 닫기
  }

  // 시작 날짜와 종료 날짜에 따라 열의 수 계산
  const calculateColumnCount = () => {
    if (!startDate || !endDate) return 0
    const startDateTime = startDate.getTime()
    const endDateTime = endDate.getTime()
    const numberOfDays =
      Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24)) + 1 // 선택한 날짜 수 계산
    return numberOfDays
  }

  // 시작 시간과 종료 시간에 따라 행의 수 계산
  const calculateRowCount = () => {
    if (!startTime || !endTime) return 0
    const startHour = startTime.getHours()
    const startMinute = startTime.getMinutes()
    const endHour = endTime.getHours()
    const endMinute = endTime.getMinutes()
    const startMinutes = startHour * 60 + startMinute
    const endMinutes = endHour * 60 + endMinute
    const durationInMinutes = endMinutes - startMinutes
    const numberOfRows = Math.ceil(durationInMinutes / 60) // 30분 간격으로 행 계산
    return numberOfRows
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  // 드래그 종료 이벤트 핸들러
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const drawTable = () => {
    const columnCount = calculateColumnCount()
    const rowCount = calculateRowCount()

    if (columnCount > 0 && rowCount > 0) {
      // 시작 날짜와 종료 날짜 사이의 모든 날짜 가져오기
      const dates: Date[] = []
      if (startDate && endDate) {
        const currentDate = new Date(startDate)
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        }
      }

      // 드래그 중일 때만 배경색 변경
      const cellClassName = isDragging
        ? 'border w-14 h-8 bg-black'
        : 'border w-14 h-8'

      return (
        <div className="flex items-center justify-center" ref={tableRef}>
          <table className="">
            <thead>
              {/* 열 헤더 추가 */}
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th className="" />
              {dates.map((date, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <th key={index} className="text-[10px] font-normal p-1">
                  {date.toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  <br />{' '}
                  <span className="text-[12px]">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </th>
              ))}
            </thead>
            <tbody>
              {[...Array(rowCount)].map((_, rowIndex) => {
                if (!startTime) return null

                const startHour = startTime.getHours() + rowIndex
                const endHour = startTime.getHours() + rowIndex + 1

                const formattedStartTime = new Date(startTime)
                formattedStartTime.setHours(startHour)
                const formattedEndTime = new Date(startTime)
                formattedEndTime.setHours(endHour)

                return (
                  <tr key={rowIndex} className="">
                    <td
                      key={rowIndex}
                      className={cellClassName}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                    >
                      <div className="text-[10px] text-center">
                        {formattedStartTime.toLocaleString('en-US', {
                          hour: 'numeric',
                          hour12: true,
                        })}
                        -
                        {formattedEndTime.toLocaleString('en-US', {
                          hour: 'numeric',
                          hour12: true,
                        })}
                      </div>
                    </td>
                    {/* 생략 */}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md border border-gray-200 z-20 w-[520px] h-auto">
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
        <div className="flex justify-center items-center pb-4 pt-4">
          <textarea
            value={eventName}
            placeholder="이벤트 이름을 입력하세요"
            className="w-[339px] h-[38px] text-[14px] rounded-[2px] border border-[#d9d9d9] resize-none pt-2 pl-2"
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div className="pt-1 pb-7">
          {/* 시작 날짜 선택 */}
          <div className="flex justify-center items-center">
            <div className="flex items-center mb-3">
              <div className="text-[12px] text-[#636363] whitespace-nowrap pr-1.5">
                시작 일시
              </div>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="MM월 dd일"
                  placeholderText="시작 날짜 선택"
                  className="text-xs bg-white w-[121px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-1.5 pl-3"
                  formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                  ref={startDatePickerRef}
                />
                <button
                  onClick={() => {
                    startDatePickerRef.current?.setFocus()
                  }}
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-5 border-none bg-none cursor-pointer"
                >
                  <Image src={ViewCalendarBtn} alt="calendar" />
                </button>
              </div>
              {/* 시작 시간 선택 */}
              <div className="relative">
                <DatePicker
                  selected={startTime}
                  onChange={(date: Date | null) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  placeholderText="시작 시간 선택"
                  timeIntervals={60}
                  dateFormat="HH:mm"
                  className="text-xs bg-white w-[107px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-3 px-3"
                  ref={startTimePickerRef}
                />
                <button
                  onClick={() => {
                    startTimePickerRef.current?.setFocus()
                  }}
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-5 border-none bg-none cursor-pointer"
                >
                  <Image src={ViewCalendarBtn} alt="calendar" />
                </button>
              </div>
            </div>
          </div>
          {/* 종료 날짜 선택 */}
          <div className="flex justify-center items-center">
            <div className="flex items-center mb-[10px]">
              <div className="text-[12px] text-[#636363] whitespace-nowrap pr-1.5">
                종료 일시
              </div>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  dateFormat="MM월 dd일"
                  placeholderText="종료 날짜 선택"
                  className="text-xs bg-white w-[121px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-1.5 pl-3"
                  formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                  ref={endDatePickerRef}
                />
                <button
                  onClick={() => {
                    endDatePickerRef.current?.setFocus()
                  }}
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-5 border-none bg-none cursor-pointer"
                >
                  <Image src={ViewCalendarBtn} alt="calendar" />
                </button>
              </div>
              {/* 종료 시간 선택 */}
              <div className="relative">
                <DatePicker
                  selected={endTime}
                  onChange={(date: Date | null) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  placeholderText="종료 시간 선택"
                  timeIntervals={60}
                  dateFormat="HH:mm"
                  className="text-xs bg-white w-[107px] h-[32px] border border-[#d9d9d9] rounded-[2px] mx-3 px-3"
                  ref={endTimePickerRef}
                />
                <button
                  onClick={() => {
                    endTimePickerRef.current?.setFocus()
                  }}
                  className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-5 border-none bg-none cursor-pointer"
                >
                  <Image src={ViewCalendarBtn} alt="calendar" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-10">{drawTable()}</div>
        <div className="flex justify-center align-center pt-4">
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-[2px] bg-[#ffffff] text-[14px] border border-[#959595]"
          >
            확인
          </button>
        </div>
      </div>
    </>
  )
}

export default WhenToMeetModal
