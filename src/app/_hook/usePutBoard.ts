import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import { useMutation, MutationFunction } from '@tanstack/react-query'

interface UpdatePostArgs {
  formData: FormData
  boardId: number
}

const usePutBoard = () => {
  const router = useRouter()
  const updatePost: MutationFunction<Response, UpdatePostArgs> = async ({
    formData,
    boardId,
  }) => {
    try {
      const response = await api.put<Response>('/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { boardId: Number(boardId) },
      })
      console.log(response.data)
      return response.data
    } catch (error: any) {
      throw new Error(`게시글 수정 실패 : ${error.message}`)
    }
  }

  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      console.log('게시글 수정 성공')
    },
    onError: (error: any) => {
      console.error(error.message)
    },
  })
}

export default usePutBoard
