// addEventModal.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import { Cancel } from '@/_assets/Icons';

interface AddEventModalProps {
    onClose: () => void;
    onSave: (event: any) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSave = () => {
        const startDateTime = new Date(startDate + 'T' + startTime);
        const endDateTime = new Date(endDate + 'T' + endTime);
        // 이벤트 정보 저장
        onSave({ title, start: startDateTime, end: endDateTime });
        onClose();
    };

    return (
        <div className="absolute top-[235px] right-[215px] transform -translate-x-1/2 bg-white p-6 rounded-md border border-gray-200 z-10 w-[370px] h-[385px]">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">일정 추가</h1>
                <button onClick={onClose} className="ml-auto">
                    <Image src={Cancel} alt="cancel" />
                </button>
            </div>

            <hr className="my-4 border-gray-300" />
            <div className="h-[210px]">
                {/* 시작 날짜, 시간 */}
                <div className="flex items-center mb-[10px]">
                    <div className="w-1/5 mr-[10px] text-center">시작 날짜</div>
                    <div className="w-2/5">
                        <input
                            type="date"
                            className="text-xs bg-white w-[120px] h-[36px] border border-gray-300 rounded-full mx-2 px-3"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="w-2/5">
                        <input
                            type="time"
                            className="text-xs bg-white w-[100px] h-[36px] border border-gray-300 rounded-full mx-1 px-3"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                </div>


                {/* 종료 날짜 시간 */}
                <div className="flex items-center mb-[10px]">
                    <div className="w-1/5 mr-[10px] text-center">종료 날짜</div>
                    <div className="w-2/5">
                        <input
                            type="date"
                            className="text-xs bg-white w-[120px] h-[36px] border border-gray-300 rounded-full mx-2 px-3"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="w-2/5">
                        <input
                            type="time"
                            className="text-xs bg-white w-[100px] h-[36px] border border-gray-300 rounded-full mx-1 px-3"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>


                {/* 내용 */}
                <div className="flex mb-[10px] mt-2.5">
                    <div className="w-1/4 mr-[10px]">내용</div>
                    <div className="w-3/4">
                        <input
                            type="text"
                            value={title}
                            className="w-[224px] h-[116px] rounded-md border border-gray-300 mt-[5px] mr-[16px]"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-center">
                <button
                    onClick={handleSave}
                    className="items-center w-24 h-9 rounded-2xl bg-[#FFCD00] text-white"
                >
                    추가
                </button>
            </div>
        </div>
    );
};

export default AddEventModal;
