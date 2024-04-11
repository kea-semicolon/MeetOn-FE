import React, {useState} from 'react';
import Image from "next/image"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Cancel} from "@/_assets/Icons";
import {ViewCalendarBtn} from "@/_assets/Icons";


interface AddEventModalProps {
    onClose: () => void;
    onSave: (event: any) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({onClose, onSave}) => {
    const [title, setTitle] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [endTime, setEndTime] = useState<Date | null>(null);

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
            className="absolute top-[238px] right-[305px] transform -translate-x-1/2 bg-white p-6 rounded-md border border-gray-200 z-10 w-[309px] h-[373px]">
            <style jsx global>{`
                .react-datepicker {
                    font-size: 10px;
                    background-color: #fff;
                    color: #000;
                    border: 1px solid #d5d5d5;
                    border-radius: 0.3rem;
                    display: inline-block;
                    position: relative;
                    line-height: initial;
                }
                .react-datepicker__day-names {
                    white-space: nowrap;
                    margin: 3px 0 -8px 0;
                }
                .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle {
                    fill: white;
                    color: white;
                }
                .react-datepicker-popper[data-placement^=top] .react-datepicker__triangle {
                    fill: white;
                    color: white;
                }
                .react-datepicker__header {
                    background-color: white;
                }
                .react-datepicker__day--selected, .react-datepicker__day--selected:hover {
                    background-color: #FFCD00;
                    color: white;
                    border-radius: 50%;
                }
                .react-datepicker__day:hover {
                    border-radius: 50%;
                }
                
                .react-datepicker__time-list li {
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                }
                
                .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
                    background-color: #ffcd00;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center; 
                }

                .react-datepicker__day--selected {
                    font-weight: bold;
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
                                <Image src={ViewCalendarBtn} alt={'error'}
                                       className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[-7px]"/>
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
                            />
                            <Image src={ViewCalendarBtn} alt={'error'}
                                   className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[-7px]"/>
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
