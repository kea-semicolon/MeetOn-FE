import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import api from '@/_service/axios'
import { DeleteComment } from '@/_assets/Icons'
import { useRouter } from 'next/navigation'

interface Comment {
  replyId: number
  userId: number
  username: string
  content: string
  createdDate: string
}

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day}. ${hours}:${minutes}`
}

const CommentList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [commentList, setCommentList] = useState<Comment[]>([]) // 빈 배열로 초기화
  const router = useRouter()

  const getBoardIdFromPath = (): string => {
    const queryParams = new URLSearchParams(window.location.search)
    return queryParams.get('boardId') || ''
  }

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

  useEffect(() => {
    const getCommentList = async () => {
      const boardId = getBoardIdFromPath()

      if (boardId) {
        try {
          const resp = await api.get('/reply', {
            params: { boardId: Number(boardId) },
          })
          setCommentList(resp.data.content || [])
          console.log(resp.data)
        } catch (error) {
          console.error('Error fetching comment list : ', error)
        }
      }
    }
    getCommentList()
  }, [])

  return (
    <div className="">
      {commentList.length > 0 ? (
        commentList.map((comment, index) => (
          <div key={comment.replyId}>
            {index > 0 && <hr className="border-gray-300" />}{' '}
            <div className="flex items-start space-x-2 relative pb-5 pt-2">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="Profile"
                className="w-10 h-10 rounded-full mt-1 ml-2"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[16px] pt-1">
                    {comment.username}
                  </p>
                  <div className="flex pt-1 pr-1">
                    <p className="text-[13px] text-[#959595]">
                      {formatDate(comment.createdDate)}
                    </p>
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
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="flex justify-center pt-9 text-[#959595] text-[14px]">
          등록된 댓글이 없습니다.
        </p>
      )}
    </div>
  )
}

export default CommentList
