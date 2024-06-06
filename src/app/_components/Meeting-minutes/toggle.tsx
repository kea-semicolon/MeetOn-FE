import React, { useState } from 'react'

interface ToggleProps {
  onToggle: () => void
}

const Toggle: React.FC<ToggleProps> = ({ onToggle }) => {
  const [isToggled, setIsToggled] = useState(false)
  const [toggleText, setToggleText] = useState('캘린더')

  const handleToggle = () => {
    setIsToggled(!isToggled)
    onToggle()
    setToggleText(isToggled ? '캘린더' : '표')
  }

  return (
    <div className="flex">
      <button
        onClick={handleToggle}
        className={`w-[103px] h-[39px] rounded-full ${isToggled ? 'bg-[#000000]' : 'bg-[#000000]'} focus:outline-none relative`}
      >
        <div
          className={`h-[34px] rounded-full transform duration-300 text-[12px] text-[#000000]
            ${isToggled ? 'translate-x-[47px] bg-white w-[53px]' : 'translate-x-[3px] bg-white w-[63px]'} 
            flex justify-center items-center`}
        >
          <span>{toggleText}</span>
        </div>
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 text-[12px] text-[#959595] ${isToggled ? 'left-2.5' : 'right-4'}`}
        >
          {isToggled ? '캘린더' : '표'}
        </span>
      </button>
    </div>
  )
}

export default Toggle
