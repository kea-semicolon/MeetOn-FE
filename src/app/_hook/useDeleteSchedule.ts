// useDeleteSchedule.ts

import { useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'

const useDeleteSchedule = () => {
  const router = useRouter()
  const deleteSchedule = async (scheduleId: number) => {
    try {
      console.log('Deleting schedule with ID:', scheduleId)
      const response = await api.delete('/schedule', {
        params: { scheduleId },
      })
      return response.data
    } catch (error) {
      console.error('Error deleting schedule:', error)
      throw new Error('Failed to delete schedule')
    }
  }

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      console.log('Schedule deletion 성공')
      router.push('/main')
    },
    onError: (error) => {
      console.error('Error deleting schedule:', error)
    },
  })
}

export default useDeleteSchedule
