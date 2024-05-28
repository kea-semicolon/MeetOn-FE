import { useState } from 'react'
import CommentForm from '@/_components/Comment/commentForm'
import CommentList from '@/_components/Comment/commentList'

const Comment = () => {
  const [isCalendarView, setIsCalendarView] = useState(true)

  const handleToggleView = () => {
    setIsCalendarView(!isCalendarView)
  }

  return (
    <div className="">
      <p className="px-3 py-2 text-[20px] font-bold">댓글</p>
      <hr className="h-0.5 bg-[#000000]" />
      <div>
        <CommentList />
      </div>
      <div className="pt-1">
        <CommentForm />
      </div>
    </div>
  )
}

export default Comment
