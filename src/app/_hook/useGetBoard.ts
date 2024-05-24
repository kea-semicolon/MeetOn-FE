import { useSuspenseQuery } from '@tanstack/react-query'
import { CreateBoardInfo } from '@/_types'
import boardInfo from '@/_service/boardInfo'

const useGetBoard = () => {
  const queryKey = ['boardInfo']

  return useSuspenseQuery<CreateBoardInfo, Error>({
    queryKey,
    queryFn: boardInfo,
  })
}

export default useGetBoard
