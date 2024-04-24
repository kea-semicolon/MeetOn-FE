import { useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'

interface PostChannelProps {
  userImage: string
  userNickname: string
  userAuth: string
  channelName: string
}

const usePostChannel = () => {
  const router = useRouter()
  const createChannel = async ({
    userImage,
    userNickname,
    userAuth,
    channelName,
  }: PostChannelProps) => {
    return api.post<Response>('/channel', {
      userImage,
      userNickname,
      userAuth,
      channelName,
    })
  }
  return useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      router.push('/main')
    },
    onError: (error) => {
      console.error('Error creating channel:', error)
    },
  })
}

export default usePostChannel
