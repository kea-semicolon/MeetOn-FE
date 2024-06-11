import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/_service/axios'

const useDeleteMemo = () => {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteMemo = async (memoId: number) => {
    try {
      await api.delete('/memo', { params: { memoId } })
      router.push('/memo')
    } catch (error) {
      console.error('Error deleting memo:', error)
      alert('메모 삭제에 실패했습니다.')
    } finally {
      setShowDeleteModal(false)
    }
  }

  const handleDelete = (memoId: number) => {
    console.log(memoId)
    deleteMemo(memoId)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
  }

  return { handleDelete, handleDeleteClick, handleCloseModal, showDeleteModal }
}

export default useDeleteMemo
