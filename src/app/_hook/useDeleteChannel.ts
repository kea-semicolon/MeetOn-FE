import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/_service/axios'

const useDeleteChannel = () => {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteChannel = async () => {
    try {
      await api.delete('/channel')
      router.push('/login')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('채널 삭제에 실패했습니다.')
    } finally {
      setShowDeleteModal(false)
    }
  }

  const handleDelete = () => {
    deleteChannel()
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
  }

  return { handleDelete, handleDeleteClick, handleCloseModal, showDeleteModal }
}

export default useDeleteChannel
