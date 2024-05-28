'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import api from '@/_service/axios'
import Comment from '@/_components/Comment/comment'
import DeleteBoardModal from '@/_components/Board/deleteBoardModal'

interface BoardItem {
  boardId: number
  title: string
  username: string
  createdDate: string
  content: string
}

const BoardDetail = () => {
  const router = useRouter()
  const [boardDetail, setBoardDetail] = useState<BoardItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const getBoardIdFromPath = (): string => {
    const queryParams = new URLSearchParams(window.location.search)
    return queryParams.get('boardId') || ''
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      const boardId = getBoardIdFromPath()
      await api.delete('/board', { params: { boardId: Number(boardId) } })

      router.push('/board')
    } catch (error) {
      console.error('Error deleting board:', error)
      alert('게시글 삭제에 실패했습니다.')
    } finally {
      setShowDeleteModal(false) // 모달을 닫습니다.
    }
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
  }

  useEffect(() => {
    const boardId = getBoardIdFromPath()

    if (boardId) {
      const fetchBoardDetail = async () => {
        try {
          const response = await api.get<BoardItem>(`/board/info`, {
            params: { boardId: Number(boardId) },
          })
          const boardData = response.data
          setBoardDetail(boardData)
        } catch (error) {
          console.error('Error fetching board detail:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchBoardDetail()
    }
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  return (
    <div className="w-3/5 h-full absolute bg-[#F8F9FB]">
      <p className="px-6 py-4 text-[20px] font-bold">게시판</p>
      <div className="pl-4 pr-4 pt-2">
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="flex-1 mr-4 px-3 py-1.5 border border-[#959595] rounded-[3px] text-[22px] focus:outline-none"
            placeholder="제목"
            value={boardDetail?.title || ''}
            readOnly={!isEditing}
          />

          <div className="flex items-center pl-28">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile"
              className="w-9 h-9 rounded-full mt-1 ml-2"
            />
            <div className="pl-2 pr-0.5">
              <div className="items-center justify-between">
                <p className="font-semibold text-[14px] pt-1">
                  {boardDetail?.username || '작성자'}
                </p>
                <p className="text-[12px] text-[#959595]">
                  {boardDetail?.createdDate || '날짜'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <textarea
            className="mb-4 w-full h-96 px-3 py-2 border border-[#959595] rounded-[3px] text-[14px] focus:outline-none"
            placeholder="내용을 입력하세요"
            value={boardDetail?.content || ''}
            readOnly={!isEditing} // 수정 모드일 때만 입력 가능
          />
        </div>
        <div className="pb-4 flex justify-end">
          {!isEditing && (
            <>
              <button
                onClick={handleEditClick}
                className="bg-white text-[14px] text-black px-5 py-1.5 rounded-[4px] border border-[#959595] mr-1.5"
              >
                수정
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-[#000000] text-[14px] text-[#D2FA64] px-5 py-1.5 rounded-[4px] border border-[#000000]"
              >
                삭제
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button className="bg-[#000000] text-[14px] text-[#D2FA64] px-5 py-1.5 rounded-[4px] border border-[#000000] mr-1.5">
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white text-[14px] text-black px-5 py-1.5 rounded-[4px] border border-[#959595]"
              >
                취소
              </button>
            </>
          )}
          {showDeleteModal && (
            <DeleteBoardModal
              onClose={handleCloseModal}
              onDelete={handleDeleteConfirm}
            />
          )}
        </div>
        <div>
          <Comment />
        </div>
      </div>
    </div>
  )
}

export default BoardDetail
