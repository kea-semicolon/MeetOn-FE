import { useSuspenseQuery } from '@tanstack/react-query'
import { Schedule } from '@/_types'
import scheduleInfo from '@/_service/scheduleInfo'

const useGetSchedule = (year: number, month: number) => {
  const queryKey = ['schedule', year, month]

  return useSuspenseQuery<Schedule, Error>({
    queryKey,
    queryFn: () => scheduleInfo(year, month),
  })
}

export default useGetSchedule
