import { useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'

interface PostWhenToMeetProps {
  title: string
  startDate: string
  endDate: string
  startTime: number
  endTime: number
}

const usePostWhenToMeet = () => {
  const router = useRouter()
  const createSchedule = async ({
    title,
    startDate,
    endDate,
    startTime,
    endTime,
  }: PostWhenToMeetProps) => {
    console.log('Creating schedule info :', {
      title,
      startDate,
      startTime,
      endDate,
      endTime,
    })
    return api.post<Response>('/when-to-meet', {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
    })
  }

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: (data) => {
      console.log('when to meet 생성 성공')
      router.push('/minutes')
    },
    onError: (error) => {
      console.error('when to meet 생성 실패 : ', error)
    },
  })
}
export default usePostWhenToMeet
