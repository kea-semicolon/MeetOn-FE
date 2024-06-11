import { useSuspenseQuery } from '@tanstack/react-query'
import { WhenToMeetInfo } from '@/_types'
import whenToMeet from '@/_service/whenToMeet'

const useGetWhenToMeet = () => {
  const queryKey = ['whenToMeet']

  return useSuspenseQuery<WhenToMeetInfo, Error>({
    queryKey,
    queryFn: whenToMeet,
  })
}

export default useGetWhenToMeet
