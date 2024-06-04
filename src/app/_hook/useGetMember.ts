import { useSuspenseQuery } from '@tanstack/react-query'
import { Member } from '@/_types'
import member from '@/_service/member'

const useGetMember = () => {
  const queryKey = ['member']

  return useSuspenseQuery<Member, Error>({
    queryKey,
    queryFn: member,
  })
}

export default useGetMember
