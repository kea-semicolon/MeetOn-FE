import { MutationFunction, useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'

interface MemberProps {
  userNickname: string
  userAuth: string
  channelCode: string
}

const usePatchMember = () => {
  const patchMember = async (data: MemberProps) => {
    return api.patch<Response>(`/channel`, data)
  }

  return useMutation({ mutationFn: patchMember })
}

export default usePatchMember
