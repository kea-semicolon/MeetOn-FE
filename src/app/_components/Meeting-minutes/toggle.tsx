import React, { useState } from 'react'

interface ToggleProps {
  onToggle: () => void
}

const Toggle: React.FC<ToggleProps> = ({ onToggle }) => {
  const [isToggled, setIsToggled] = useState(false)

  const handleToggle = () => {
    setIsToggled(!isToggled)
    onToggle()
  }

  return (
    <div className="flex items-center">
      <button
        onClick={handleToggle}
        className="w-[97px] h-[38px] rounded-[19px] bg-[#000000] opacity-80 text-[#000000] focus:outline-none relative"
      >
        <div
          className={`h-[30px] rounded-[15px] shadow-md transform duration-150 bg-[#ffffff] flex items-center justify-center text-[12px]
                    ${isToggled ? 'translate-x-[48px] w-[43px]' : 'translate-x-[5px] w-[58px]'}`}
        >
          {isToggled ? '표' : '캘린더'}
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-2 text-[12px] text-[#959595]">
          <span className={`${isToggled ? 'opacity-100 pl-0.5' : 'opacity-0'}`}>
            캘린더
          </span>
          <span className={`${isToggled ? 'opacity-0' : 'opacity-100 pr-1.5'}`}>
            표
          </span>
        </div>
      </button>
    </div>
  )
}

export default Toggle
