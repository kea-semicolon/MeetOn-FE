import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import { useMutation, MutationFunction } from '@tanstack/react-query'

interface PostBoardProps {
  title: string
  content: string
  isNotice: boolean
  fileList: string[]
}

const usePostBoard = () => {
  const router = useRouter()
  const createPost: MutationFunction<Response, PostBoardProps> = async ({
    title,
    content,
    isNotice,
    fileList,
  }) => {
    try {
      const response = await api.post<Response>('/board', {
        title,
        content,
        isNotice,
        fileList,
      })
      console.log('create post success:', response.data)
      return response.data
    } catch (error: any) {
      throw new Error(`Error creating post: ${error.message}`)
    }
  }

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log('create post success')
      router.push('/board')
    },
    onError: (error: any) => {
      console.error(error.message)
    },
  })
}

export default usePostBoard
