import { useMutation } from '@tanstack/react-query'
import api from '@/_service/axios'

interface PostMemoProps {
  content: string
}

const usePostMemo = () => {
  const createMemo = async ({ content }: PostMemoProps) => {
    return api.post<Response>('/memo', {
      content,
    })
  }
  return useMutation({
    mutationFn: createMemo,
    onSuccess: () => {
      console.log('Success for saving memo')
    },
    onError: (error) => {
      console.error('Error creating memo:', error)
    },
  })
}

export default usePostMemo
