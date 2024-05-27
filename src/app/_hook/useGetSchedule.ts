import { useSuspenseQuery } from '@tanstack/react-query'
import { ScheduleInfo } from '@/_types'
import scheduleInfo from '@/_service/scheduleInfo'

const useGetSchedule = () => {
  const queryKey = ['scheduleInfo']

  return useSuspenseQuery<ScheduleInfo, Error>({
    queryKey,
    queryFn: scheduleInfo,
  })
}

export default useGetSchedule
