/*
import { useState, useEffect } from 'react'
import { BoardItem } from '@/_types'
import { getBoardList } from '@/_service/boardInfo'

const useGetBoard = (page: number, size: number) => {
  const [boardList, setBoardList] = useState<BoardItem[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        setLoading(true)
        const { content, totalElements: fetchedTotalElements } =
          await getBoardList(page, size)

        // 공지사항과 일반 게시글 분리 후 생성일자를 기준으로 내림차순 정렬
        const notices = content.filter((item) => item.notice)
        const normalPosts = content.filter((item) => !item.notice)

        notices.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        )
        normalPosts.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        )

        const sortedBoardList = [...notices, ...normalPosts]

        setBoardList(sortedBoardList)
        setTotalElements(fetchedTotalElements)
      } catch (error) {
        console.error('Error fetching board list:', error)
        setBoardList([])
      } finally {
        setLoading(false)
      }
    }

    fetchBoardList()
  }, [page, size])

  return { boardList, totalElements, loading }
}

export default useGetBoard
*/

/*
import { useSuspenseQuery } from '@tanstack/react-query'
import { BoardItem } from '@/_types'
import { getBoardList } from '@/_service/boardInfo'

const useGetBoard = (page: number, size: number) => {
  const queryKey = ['boardList', page, size]

  return useSuspenseQuery<
    { content: BoardItem[]; totalElements:umber },
    Error
  >({
    queryKey,
    queryFn: async () => {
      try {
        const { content, totalElements } = await getBoardList(page, size)

        // Separate notices from regular posts
        const notices = content.filter((item) => item.notice)
        const regularPosts = content.filter((item) => !item.notice)

        // Sort notices and regular posts by createdDate in descending order
        notices.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        )
        regularPosts.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        )

        // Combine notices and regular posts
        const sortedBoardList = [...notices, ...regularPosts]

        return { content: sortedBoardList, totalElements }
      } catch (error) {
        throw error
      }
    },
  })
}

export default useGetBoard
*/

import { useQuery } from '@tanstack/react-query'
import { getBoardList } from '@/_service/boardInfo'
import { BoardItem } from '@/_types'

const useGetBoard = (page: number, size: number) => {
  const queryKey = ['boardList', page, size]

  return useQuery<{ content: BoardItem[]; totalElements: number }, Error>({
    queryKey,
    queryFn: async () => {
      try {
        const { content, totalElements } = await getBoardList(page, size)

        const notices = content.filter((item) => item.notice)
        const regularPosts = content.filter((item) => !item.notice)

        // Sort notices and regular posts by createdDate in descending order
        notices.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        )
        regularPosts.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        )

        const sortedBoardList = [...notices, ...regularPosts]

        return { content: sortedBoardList, totalElements }
      } catch (error) {
        throw error
      }
    },
  })
}

export default useGetBoard
