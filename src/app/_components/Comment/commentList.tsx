import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import api from '@/_service/axios'
import { DeleteComment } from '@/_assets/Icons'
import { useRouter } from 'next/navigation'
import DeleteCommentModal from '@/_components/Comment/deleteCommentModal'

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
  const [commentList, setCommentList] = useState<Comment[]>([])
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  ) // 선택된 댓글 ID 상태 추가
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // 모달 열림 상태 추가

  const router = useRouter()
  const handleDeleteClick = (replyId: number) => {
    // 모달 열기 및 선택된 댓글 ID 설정
    setSelectedCommentId(replyId)
    setIsModalOpen(true)
  }

  const getBoardIdFromPath = (): string => {
    const queryParams = new URLSearchParams(window.location.search)
    return queryParams.get('boardId') || ''
  }

  const handleConfirmClick = async () => {
    try {
      if (selectedCommentId !== null) {
        await api.delete('/reply', {
          params: { replyId: Number(selectedCommentId) },
        })
        const updatedCommentList = commentList.filter(
          (comment) => comment.replyId !== selectedCommentId,
        )
        setCommentList(updatedCommentList)
      }
    } catch (error) {
      console.error('Error deleting comment : ', error)
      alert('댓글 삭제에 실패했습니다.')
    } finally {
      setIsModalOpen(false)
      setSelectedCommentId(null)
    }
  }

  const handleCancelDelete = () => {
    setIsModalOpen(false)
    setSelectedCommentId(null)
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
                    <button
                      onClick={() => handleDeleteClick(comment.replyId)}
                      className="pl-2 pr-1.5"
                    >
                      <Image src={DeleteComment} alt="" />
                    </button>
                  </div>
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
      {isModalOpen && (
        <DeleteCommentModal
          onClose={handleCancelDelete}
          onDelete={handleConfirmClick}
        />
      )}
    </div>
  )
}

export default CommentList
