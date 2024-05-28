import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

interface CommentData {
  content: string
}

const getBoardIdFromPath = (): string => {
  const queryParams = new URLSearchParams(window.location.search)
  return queryParams.get('boardId') || ''
}

const usePostComment = () => {
  const router = useRouter()
  const boardId = getBoardIdFromPath()

  const createComment = async (commentData: CommentData): Promise<any> => {
    try {
      const response = await api.post('/reply', commentData, {
        params: { boardId: Number(boardId) },
      })
      return response.data
    } catch (error: any) {
      throw new Error(`Error posting comment: ${error.message}`)
    }
  }

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      console.log('Comment posted successfully')
      // router.push('/board')
    },
    onError: (error: any) => {
      console.error('Error posting comment:', error)
    },
  })
}

export default usePostComment
