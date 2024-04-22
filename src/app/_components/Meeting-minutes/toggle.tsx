import React, { useState } from "react";
import { CalendarImg, Table } from "@/_assets/Icons";
import Image from 'next/image'

interface ToggleProps {
    onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(true);
    const [imageSrc, setImageSrc] = useState(CalendarImg);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        onToggle();

        setImageSrc(isToggled ? Table : CalendarImg);   // 디자인 업데이트 후 이미지 변경 필요
    };

    return (
        <div className="flex items-center">
            <button onClick={handleToggle} className={`w-[72px] h-[38px] rounded-full ${isToggled ? 'bg-[#ffcd00]' : 'bg-[#ffcd00]'} focus:outline-none relative`}>
                <div className={`w-[32px] h-[32px] rounded-full shadow-md transform duration-300 
                    ${isToggled ? 'translate-x-[34px]' : 'translate-x-[5px]'}`}>
                    <Image src={imageSrc} alt={''}/>
                </div>
            </button>
        </div>
    );
};

export default Toggle;
