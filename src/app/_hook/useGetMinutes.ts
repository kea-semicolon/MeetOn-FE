import { useSuspenseQuery } from '@tanstack/react-query'
import { Minutes } from '@/_types'
import minutesInfo from '@/_service/minutesInfo'

const useGetMinutes = () => {
  const queryKey = ['minutes']

  return useSuspenseQuery<Minutes, Error>({
    queryKey,
    queryFn: () => minutesInfo(),
  })
}

export default useGetMinutes
