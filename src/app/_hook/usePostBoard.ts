import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

interface PostBoardProps {
  title: string
  content: string
  isNotice: boolean
  fileList: File[]
}

const usePostBoard = () => {
  const router = useRouter()
  const createPost = async ({
    title,
    content,
    isNotice,
    fileList,
  }: PostBoardProps) => {
    return api.post<Response>('/board', {
      title,
      content,
      isNotice,
      fileList,
    })
  }
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log(createPost)
      router.push('/board')
    },
    onError: (error) => {
      console.error('Error creating post :', error)
    },
  })
}

export default usePostBoard
