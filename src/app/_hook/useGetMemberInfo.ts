import { useSuspenseQuery } from '@tanstack/react-query'
import { MemberInfo } from '@/_types'
import memberInfo from '@/_service/memberInfo'

const useGetMemberInfo = () => {
  const queryKey = ['memberInfo']

  return useSuspenseQuery<MemberInfo, Error>({
    queryKey,
    queryFn: memberInfo,
  })
}

export default useGetMemberInfo
