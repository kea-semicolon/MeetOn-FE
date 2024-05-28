import React, { useState } from 'react'
import Image from 'next/image'
import { DeleteComment } from '@/_assets/Icons'

const CommentList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleEditClick = () => {
    alert('수정 버튼을 클릭했습니다.')
    setIsMenuOpen(false) // Close the menu after clicking Edit
  }

  const handleDeleteClick = () => {
    alert('삭제 버튼을 클릭했습니다.')
    setIsMenuOpen(false) // Close the menu after clicking Delete
  }

  return (
    <div className="flex items-start space-x-2 relative">
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        alt="Profile"
        className="w-10 h-10 rounded-full mt-1 ml-2"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-[16px] pt-1">김가현</p>
          <div className="flex pt-1 pr-1">
            <p className="text-[13px] text-[#959595]">2024.07.06. 18:02</p>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button onClick={handleMenuToggle} className="pl-3 pr-1.5">
              <Image src={DeleteComment} alt="" />
            </button>
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-300 shadow-lg">
              <button
                onClick={handleEditClick}
                className="block w-full px-4 py-2 text-left"
              >
                수정
              </button>
              <button
                onClick={handleDeleteClick}
                className="block w-full px-4 py-2 text-left"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <p className="text-[16px] pt-1.5 pr-1 pb-1">
          댓글내용댓글내용댓글내용댓댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용용댓글내용
        </p>
      </div>
    </div>
  )
}

export default CommentList
