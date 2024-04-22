import React, {useState} from 'react';
import Image from "next/image"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Cancel} from "@/_assets/Icons";
import {ViewCalendarBtn} from "@/_assets/Icons";
import '@/_styles/addEventModal.css';

interface AddEventModalProps {
    onClose: () => void;
    onSave: (event: any) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({onClose, onSave}) => {
    const [title, setTitle] = useState<string>('');
    const defaultTime = new Date();
    defaultTime.setHours(9, 0, 0, 0); // 오전 9시


    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [startTime, setStartTime] = useState<Date | null>(defaultTime);
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [endTime, setEndTime] = useState<Date | null>(defaultTime);


    const handleSave = () => {
        if (!startDate && !startTime && !endDate && !endTime) {
            alert('날짜와 시간을 입력하세요.');
        } else if (!startDate || !endDate) {
            alert('날짜를 입력하세요.');
        } else if (!startTime || !endTime) {
            alert('시간을 입력하세요.');
        } else {
            // 날짜 시간 모두 입력 (모든 조건 충족된 경우)
            const startDateTime = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
                startTime.getHours(),
                startTime.getMinutes()
            );
            const endDateTime = new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate(),
                endTime.getHours(),
                endTime.getMinutes()
            );
            onSave({title, start: startDateTime, end: endDateTime});
            onClose();
        }
    };


    return (
        <div
            className="absolute top-[38px] right-[-118px] transform -translate-x-1/2 bg-white p-6 rounded-md border border-gray-200 z-10 w-[309px] h-[373px]">
            <style jsx global>{`
                .react-datepicker__input-container {
                    width: 0%;
                }
            
            `}</style>
            <div className="flex justify-between items-center">
                <h1 className="text-sm font-semibold">일정 추가</h1>
                <button onClick={onClose} className="ml-auto">
                    <Image src={Cancel} alt="cancel"/>
                </button>
            </div>
            <hr className="my-4 border-gray-300"/>

            <div className="h-[210px]">
                {/* 시작 날짜 시간 선택 */}
                <div className="flex items-center mb-[10px]">
                    <div className="w-1/5 mr-[10px] text-[10px] text-[#636363] text-center ">시작 날짜</div>
                    <div className="w-2/5">
                        <div className="relative">
                            <label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date | null) => setStartDate(date)}
                                    dateFormat="MM월 dd일"
                                    className="text-xs bg-white w-[115px] h-[28px] border border-gray-300 rounded-full mx-2 pl-3.5"
                                    formatWeekDay={nameOfDay => nameOfDay.substr(0,3)}
                                />
                                <button
                                    onClick={() => {
                                        const datePickerInput = document.querySelector('.react-datepicker-wrapper input');
                                        if (datePickerInput) {
                                            const event = new MouseEvent('click', {
                                                bubbles: true,
                                                cancelable: true,
                                                view: window
                                            });
                                            datePickerInput.dispatchEvent(event);
                                        }
                                    }}
                                    className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[-7px] border-none bg-none cursor-pointer"
                                >
                                    <Image src={ViewCalendarBtn} alt={'error'}/>
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
                            className="text-xs bg-white w-[60px] h-[28px] border border-gray-300 rounded-full mx-7 px-3"
                        />
                    </div>
                </div>

                {/* 종료 날짜 시간 선택 */}
                <div className="flex items-center mb-[10px]">
                    <div className="w-1/5 mr-[10px] text-[10px] text-[#636363] text-center">종료 날짜</div>
                    <div className="w-2/5">
                        <div className="relative">
                            <DatePicker
                                selected={endDate}
                                onChange={(date: Date | null) => setEndDate(date)}
                                dateFormat="MM월 dd일"
                                className="text-xs bg-white w-[115px] h-[28px] border border-gray-300 rounded-full mx-2 pl-3.5"
                                formatWeekDay={nameOfDay => nameOfDay.substr(0,3)}
                                wrapperClassName="react-datepicker-wrapper-end"
                            />
                            <button
                                onClick={() => {
                                    const datePickerInput = document.querySelector('.react-datepicker-wrapper-end input');
                                    if (datePickerInput) {
                                        const event = new MouseEvent('click', {
                                            bubbles: true,
                                            cancelable: true,
                                            view: window
                                        });
                                        datePickerInput.dispatchEvent(event);
                                    }
                                }}
                                className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[-7px] border-none bg-none cursor-pointer"
                            >
                                <Image src={ViewCalendarBtn} alt={'error'} />
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
                            className="text-xs bg-white w-[60px] h-[28px] border border-gray-300 rounded-full mx-7 px-3"
                        />
                    </div>
                </div>


                <div className="flex mb-[10px] mt-3.5">
                    <div className="w-1/4 mr-[10px] text-[10px] text-[#636363] ml-[2px]"><p className="mt-[3px]">내용</p>
                    </div>
                    <div className="w-3/4">
                        <textarea value={title}
                                  className="w-[182px] h-[116px] text-[12px] rounded-md border border-gray-300 mt-[5px] ml-[-13px] inline-block align-top resize-none"
                                  onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                </div>
            </div>
            <hr className="my-4 border-gray-300"/>
            <div className="flex justify-center">
                <button onClick={handleSave}
                        className="items-center w-[87px] h-[32px] rounded-2xl bg-[#FFCD00] text-white text-[14px]">
                    추가
                </button>
            </div>
        </div>
    );
};

export default AddEventModal;
