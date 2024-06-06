import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Cancel, ViewCalendarBtn } from '@/_assets/Icons'
import '@/_styles/addEventModal.css'
import usePostSchedule from '@/_hook/usePostSchedule' // 저장에 사용될 훅
import useUpdateSchedule from '@/_hook/usePutSchedule'
import useDeleteSchedule from '@/_hook/useDeleteSchedule'

interface AddEventModalProps {
  onClose: () => void
  onSave: (event: any) => void
  selectedEvent: any
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  onClose,
  onSave,
  selectedEvent,
}) => {
  const [title, setTitle] = useState<string>('')
  const defaultStartTime = new Date()
  const defaultEndTime = new Date()
  defaultStartTime.setHours(9, 0, 0, 0) // 오전 9시
  defaultEndTime.setHours(23, 59, 0, 0)

  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [startTime, setStartTime] = useState<Date | null>(defaultStartTime)
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [endTime, setEndTime] = useState<Date | null>(defaultEndTime)

  const postScheduleMutation = usePostSchedule() // 새 일정을 추가하기 위한 훅
  const updateScheduleMutation = useUpdateSchedule() // 일정을 업데이트하기 위한 훅
  const deleteScheduleMutation = useDeleteSchedule()

  const [scheduleId, setScheduleId] = useState<number | null>(null)

  useEffect(() => {
    if (selectedEvent) {
      setScheduleId(selectedEvent.scheduleId)
      setTitle(selectedEvent.title)
      setStartDate(selectedEvent.start)
      setStartTime(selectedEvent.start)
      setEndDate(selectedEvent.end)
      setEndTime(selectedEvent.end)
    }
  }, [selectedEvent])

  const handleSave = () => {
    if (!startDate && !startTime && !endDate && !endTime) {
      alert('날짜와 시간을 입력하세요.')
    } else if (!startDate || !endDate) {
      alert('날짜를 입력하세요.')
    } else if (!startTime || !endTime) {
      alert('시간을 입력하세요.')
    } else {
      const startDateTime = new Date(
        startDate!.getFullYear(),
        startDate!.getMonth(),
        startDate!.getDate(),
        startTime!.getHours(),
        startTime!.getMinutes(),
      )
      const endDateTime = new Date(
        endDate!.getFullYear(),
        endDate!.getMonth(),
        endDate!.getDate(),
        endTime!.getHours(),
        endTime!.getMinutes(),
      )

      try {
        // 새 일정 추가
        postScheduleMutation.mutateAsync({
          title,
          startTime: startDateTime.toJSON(),
          endTime: endDateTime.toJSON(),
        })
        onSave({ title, start: startDateTime, end: endDateTime })
        onClose()
      } catch (error) {
        console.error('Error saving schedule:', error)
      }
    }
  }

  const handleUpdate = () => {
    if (!startDate && !startTime && !endDate && !endTime) {
      alert('날짜와 시간을 입력하세요.')
    } else if (!startDate || !endDate) {
      alert('날짜를 입력하세요.')
    } else if (!startTime || !endTime) {
      alert('시간을 입력하세요.')
    } else {
      const startDateTime = new Date(
        startDate!.getFullYear(),
        startDate!.getMonth(),
        startDate!.getDate(),
        startTime!.getHours(),
        startTime!.getMinutes(),
      )
      const endDateTime = new Date(
        endDate!.getFullYear(),
        endDate!.getMonth(),
        endDate!.getDate(),
        endTime!.getHours(),
        endTime!.getMinutes(),
      )

      try {
        // 일정 업데이트
        console.log('1 : ', selectedEvent.id)
        updateScheduleMutation.mutateAsync({
          scheduleId: selectedEvent?.id,
          title,
          startTime: startDateTime.toJSON(),
          endTime: endDateTime.toJSON(),
        })
        console.log('2 : ', selectedEvent.id)
        onSave({
          ...selectedEvent,
          title,
          start: startDateTime,
          end: endDateTime,
        })
        onClose()
      } catch (error) {
        console.error('Error updating schedule:', error)
      }
    }
  }

  const handleDelete = async (deleteScheduleId: number) => {
    try {
      console.log('삭제 버튼 클릭')
      console.log('삭제할 스케줄 id: ', deleteScheduleId)
      if (deleteScheduleId) {
        // 삭제 요청 보내기
        await deleteScheduleMutation.mutateAsync(deleteScheduleId)
        // 삭제가 성공하면 onDelete 콜백 실행
        console.log('Deleted scheduleId:', deleteScheduleId) // 삭제 버튼을 클릭하면 selected schedule id 출력
        onClose()
      } else {
        console.log('schedule id 존재 안함')
      }
    } catch (error) {
      console.error('Error deleting schedule:', error)
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      handleDelete(selectedEvent.id) // selectedEvent.id를 handleDelete 함수의 인자로 전달
      onClose()
    }
  }

  return (
    <>
      {selectedEvent && (
        <div className="fixed inset-0 bg-black opacity-50 z-10" />
      )}
      <div
        className={`${selectedEvent ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'absolute top-[10%] -right-[7%] transform -translate-x-1/2'} bg-white p-6 rounded-md border border-gray-200 z-20 w-[280px] h-[346px]`}
      >
        <style jsx global>{`
          .react-datepicker__input-container {
            width: 0%;
          }
        `}</style>
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold">
            {selectedEvent ? '일정 수정' : '일정 추가'}
          </h1>
          <button onClick={onClose} className="mr-0.5">
            <Image src={Cancel} alt="cancel" />
          </button>
        </div>
        <hr className="my-4 border-gray-300" />

        <div className="h-[210px]">
          {/* 시작 날짜 시간 선택 */}
          <div className="flex items-center mb-[10px]">
            <div className="w-1/5 mr-[6px] text-[10px] text-[#636363] text-center ">
              시작 날짜
            </div>
            <div className="w-2/5">
              <div className="relative ml-0.5">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="MM월 dd일"
                    className="text-xs bg-white w-[95px] h-[28px] border border-gray-300 rounded-full mx-1.5 pl-3"
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

            <div className="w-2/5">
              <DatePicker
                selected={startTime}
                onChange={(date: Date | null) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="HH:mm"
                className="text-xs bg-white w-[60px] h-[28px] border border-gray-300 rounded-full mx-5 px-3"
              />
            </div>
          </div>

          {/* 종료 날짜 시간 선택 */}
          <div className="flex items-center mb-[10px]">
            <div className="w-1/5 mr-[6px] text-[10px] text-[#636363] text-center">
              종료 날짜
            </div>
            <div className="w-2/5">
              <div className="relative ml-0.5">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  dateFormat="MM월 dd일"
                  className="text-xs bg-white w-[95px] h-[28px] border border-gray-300 rounded-full mx-1.5 pl-3"
                  formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
                  wrapperClassName="react-datepicker-wrapper-end"
                />
                <button
                  onClick={() => {
                    const datePickerInput = document.querySelector(
                      '.react-datepicker-wrapper-end input',
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
              </div>
            </div>

            <div className="w-2/5">
              <DatePicker
                selected={endTime}
                onChange={(date: Date | null) => setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="HH:mm"
                className="text-xs bg-white w-[60px] h-[28px] border border-gray-300 rounded-full mx-5 px-3"
              />
            </div>
          </div>

          <div className="flex mb-[10px] mt-3">
            <div className="w-1/4 mr-[10px] text-[10px] text-[#636363] ml-[2px]">
              <p className="mt-[3px]">내용</p>
            </div>
            <div className="w-3/4">
              <textarea
                value={title}
                className="w-[163px] h-[108px] text-[12px] rounded-md border border-gray-300 mt-[5px] ml-[-12px] inline-block align-top resize-none"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-center align-center pt-3">
          <button
            onClick={selectedEvent ? handleDeleteEvent : onClose}
            className={`pl-3.5 pr-3.5 pt-1 pb-1 rounded-[4px] border border-[#D9D9D9] text-[12px] ${
              selectedEvent
                ? 'text-[#959595] bg-[#000000] border-none'
                : 'text-black'
            } mx-0.5`}
          >
            {selectedEvent ? '삭제' : '취소'}
          </button>

          {selectedEvent ? ( // 수정 모드인지 확인
            <button
              onClick={handleUpdate}
              className="pl-3.5 pr-3.5 pt-1 pb-1 rounded-[4px] bg-[#000000] text-white text-[12px] mx-0.5"
            >
              수정
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="pl-3.5 pr-3.5 pt-1 pb-1 rounded-[4px] bg-[#000000] text-white text-[12px] mx-0.5"
            >
              저장
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default AddEventModal
