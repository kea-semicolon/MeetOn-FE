import React, { useState } from 'react'
import usePostComment from '@/_hook/usePostComment'

const CommentForm = () => {
  const { mutate: createComment } = usePostComment()
  const [commentText, setCommentText] = useState('')

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setCommentText(e.target.value)
  }

  const handleButtonClick = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      createComment({ content: commentText }) // Pass comment data here
      // Pass comment data here
      console.log(commentText)
      setCommentText('') // Reset comment text after posting
    } catch (error) {
      console.error('Error while posting comment:', error)
    }
  }

  return (
    <div className="relative">
      <textarea
        className="resize-none w-full h-20 px-3 py-2 border border-[#D9D9D9] rounded-[3px] text-[14px] text-[#959595]"
        placeholder="댓글을 남겨보세요"
        value={commentText}
        onChange={handleInputChange}
      />
      <button
        className="absolute bottom-3 right-1.5 bg-white text-[14px] text-black px-5 py-1.5 rounded-[4px] border border-[#D9D9D9]"
        onClick={handleButtonClick}
      >
        Submit
      </button>
    </div>
  )
}

export default CommentForm
