import { useSuspenseQuery } from '@tanstack/react-query'
import { Memo } from '@/_types'
import memo from '@/_service/memo'

const useGetMemo = () => {
  const queryKey = ['memo']

  return useSuspenseQuery<Memo, Error>({
    queryKey,
    queryFn: memo,
  })
}

export default useGetMemo
