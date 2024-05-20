/*
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

interface BoardItem {
  id: string
  title: string
  content: string
  isNotice: boolean
  createdAt: string
  updatedAt: string
}

const fetchBoardList = async (): Promise<BoardItem[]> => {
  try {
    const response = await api.get<BoardItem[]>('/board')
    console.log('fetch board list success:', response.data)
    return response.data
  } catch (error: any) {
    throw new Error(`Error fetching board list: ${error.message}`)
  }
}

const useGetBoardList = (): UseQueryResult<BoardItem[], Error> => {
  const router = useRouter()

  return useQuery<BoardItem[], Error>({
    queryKey: ['boardList'],
    queryFn: fetchBoardList,
    onSuccess: (data: BoardItem[]) => {
      console.log('Fetched board list successfully:', data)
    },
    onError: (error: Error) => {
      console.error('Error fetching board list:', error.message)
    },
  } as UseQueryOptions<BoardItem[], Error>)
}

export default useGetBoardList
*/
