import { useSuspenseQuery } from '@tanstack/react-query'
import { MemberInfo } from '@/_types'
import memberInfo from '@/_service/memberInfo'

const useGetItems = () => {
  const queryKey = ['memberInfo']

  return useSuspenseQuery<MemberInfo, Error>({
    queryKey,
    queryFn: memberInfo,
  })
}

export default useGetItems
