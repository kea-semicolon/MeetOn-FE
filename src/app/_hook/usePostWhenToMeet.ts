import { useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'

interface PostWhenToMeetProps {
  eventName: string
  startDate: string
  endDate: string
  startTime: number
  endTime: number
}

const usePostWhenToMeet = () => {
  const router = useRouter()
  const createSchedule = async ({
    eventName,
    startDate,
    endDate,
    startTime,
    endTime,
  }: PostWhenToMeetProps) => {
    console.log('Creating whenToMeet info :', {
      eventName,
      startDate,
      startTime,
      endDate,
      endTime,
    })
    return api.post<Response>('/when-to-meet', {
      eventName,
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
