import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/_service/axios'

const useDeleteUser = () => {
  const router = useRouter()
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)

  // `memberId`를 인자로 받는 `deleteChannel` 함수
  const deleteChannel = async (memberId: number) => {
    try {
      // `memberId`를 경로에 포함시켜서 DELETE 요청을 보냅니다.
      await api.delete(`/channel/kick?memberId=${memberId}`)
      router.push('/main')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('유저 삭제에 실패했습니다.')
    } finally {
      setShowDeleteUserModal(false)
    }
  }

  // `memberId`를 받아 `deleteChannel` 함수를 호출합니다.
  const handleDeleteUser = (memberId: number) => {
    console.log('Deleting user with ID:', memberId)
    deleteChannel(memberId)
  }

  const handleDeleteUserClick = () => {
    setShowDeleteUserModal(true)
  }

  const handleCloseUserModal = () => {
    setShowDeleteUserModal(false)
  }

  return {
    handleDeleteUser,
    handleDeleteUserClick,
    handleCloseUserModal,
    showDeleteUserModal,
  }
}

export default useDeleteUser
