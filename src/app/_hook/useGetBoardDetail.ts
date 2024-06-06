import { useQuery } from '@tanstack/react-query'
import api from '@/_service/axios'

interface BoardItem {
  boardId: number
  title: string
  username: string
  createdDate: string
  content: string
}

const useGetBoardDetail = (boardId: number) => {
  return useQuery<BoardItem, Error>({
    queryKey: ['boardDetail', boardId],
    queryFn: async () => {
      const response = await api.get<BoardItem>('/board/info', {
        params: { boardId: Number(boardId) },
      })
      return response.data
    },
  })
}

export default useGetBoardDetail
