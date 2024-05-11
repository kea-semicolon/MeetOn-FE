import { useState } from 'react'
import BoardList from '@/_components/Board/boardList'

const Board = () => {
  const [isCalendarView, setIsCalendarView] = useState(true)

  const handleToggleView = () => {
    setIsCalendarView(!isCalendarView)
  }

  return (
    <div className="w-3/5 h-full absolute bg-[#F8F9FB]">
      <p className="px-6 py-4 text-[20px] font-bold">게시판</p>
      <BoardList />
    </div>
  )
}

export default Board
