import { useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'

interface UpdateScheduleProps {
  scheduleId: number
  title: string
  startTime: string
  endTime: string
}

const useUpdateSchedule = () => {
  const router = useRouter()
  const updateSchedule = async ({
    scheduleId,
    title,
    startTime,
    endTime,
  }: UpdateScheduleProps) => {
    console.log('Updating schedule info :', {
      scheduleId,
      title,
      startTime,
      endTime,
    })
    return api.put<Response>('/schedule', {
      scheduleId,
      title,
      startTime,
      endTime,
    })
  }

  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: (data) => {
      console.log('Schedule update 성공')
      router.push('/main')
    },
    onError: (error) => {
      console.error('Error updating schedule:', error)
    },
  })
}

export default useUpdateSchedule
