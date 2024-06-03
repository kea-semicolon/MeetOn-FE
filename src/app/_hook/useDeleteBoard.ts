import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/_service/axios'

const useDeleteBoard = () => {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteBoard = async (boardId: number) => {
    try {
      await api.delete('/board', { params: { boardId } })
      router.push('/board')
    } catch (error) {
      console.error('Error deleting board:', error)
      alert('게시글 삭제에 실패했습니다.')
    } finally {
      setShowDeleteModal(false)
    }
  }

  const handleDelete = (boardId: number) => {
    console.log(boardId)
    deleteBoard(boardId)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
  }

  return { handleDelete, handleDeleteClick, handleCloseModal, showDeleteModal }
}

export default useDeleteBoard
