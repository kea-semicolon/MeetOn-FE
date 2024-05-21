import { useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'

interface PostBoardProps {
  title: string
  startTime: string
  endTime: string
}

const usePostSchedule = () => {
  const router = useRouter()
  const createSchedule = async ({
    title,
    startTime,
    endTime,
  }: PostBoardProps) => {
    console.log('Creating schedule info :', { title, startTime, endTime })
    return api.post<Response>('/schedule', {
      title,
      startTime,
      endTime,
    })
  }

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: (data) => {
      console.log('Schedule create 성공')
      router.push('/main')
    },
    onError: (error) => {
      console.error('Error creating schedule:', error)
    },
  })
}
export default usePostSchedule
