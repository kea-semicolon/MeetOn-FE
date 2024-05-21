import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import { useMutation, MutationFunction } from '@tanstack/react-query'

const usePostBoard = () => {
  const router = useRouter()
  const createPost: MutationFunction<Response, FormData> = async (formData) => {
    try {
      const response = await api.post<Response>('/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error: any) {
      throw new Error(`Error creating post : ${error.message}`)
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
