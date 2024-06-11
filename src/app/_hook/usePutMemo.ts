import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import { useMutation, MutationFunction } from '@tanstack/react-query'

interface UpdateMemoProps {
  content: string
  memoId: number
}

const usePutMemo = () => {
  const router = useRouter()
  const updateMemo: MutationFunction<Response, UpdateMemoProps> = async ({
    content,
    memoId,
  }) => {
    try {
      const response = await api.put<Response>(`/memo?memoId=${memoId}`, {
        content,
      })
      console.log(response.data)
      return response.data
    } catch (error: any) {
      throw new Error(`메모 수정 실패 : ${error.message}`)
    }
  }
  return useMutation({
    mutationFn: updateMemo,
    onSuccess: (data) => {
      console.log('메모 수정 성공')
      router.push('/main')
    },
    onError: (error: any) => {
      console.error(error.message)
    },
  })
}

export default usePutMemo
