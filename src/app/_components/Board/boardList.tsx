import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import api from '@/_service/axios'
import Image from 'next/image'
import Search from '@/_components/Board/search'
import { Write } from '@/_assets/Icons'
import { useRouter } from 'next/navigation'

interface BoardItem {
  boardId: number
  boardTitle: string
  username: string
  createdDate: string
  notice: boolean
}

interface ApiResponse {
  content: BoardItem[]
  totalElements: number // 추가
  totalPages: number
  size: number
  number: number
}

const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardItem[]>([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(0)

  const [curPage, setCurPage] = useState(0) // 현재 페이지
  const [prevBlock, setPrevBlock] = useState(0) // 이전 페이지 블록
  const [nextBlock, setNextBlock] = useState(0) // 다음 페이지 블록
  const [lastPage, setLastPage] = useState(0) // 마지막 페이지

  const [search, setSearch] = useState({ page: 1, sk: '', sv: '' })

  const router = useRouter()
  const moveToWrite = () => {
    router.push('/board/write')
  }

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  useEffect(() => {
    const getBoardList = async (currentPage: number) => {
      try {
        const resp = await api.get<ApiResponse>('/board', {
          params: {
            page: currentPage,
            size: 100,
          },
        })
        const {
          content,
          totalElements: fetchedTotalElements,
          totalPages: fetchedTotalPages,
        } = resp.data

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
        console.log('총 게시물 개수 :', fetchedTotalElements)
      } catch (error) {
        console.error('Error fetching board list:', error)
        setBoardList([])
      }
    }

    getBoardList(page)
  }, [page, size])

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber)
  }

  return (
    <div className="bg-white rounded-[12px]">
      <div className="flex ml-1 mr-1 pl-4 pr-4 pt-7 justify-between items-center">
        <button
          onClick={moveToWrite}
          className="bg-[#000000] pt-1.5 pb-1.5 pl-5 pr-5 border border-[#000000] rounded-[4px] flex justify-center items-center text-[#D2FA64] text-[14px]"
        >
          <Image src={Write} alt="" className="mr-1" />
          글쓰기
        </button>
        <Search />
      </div>
      <div className="pt-7">
        <table className="min-w-full bg-white">
          <thead className="border-t-2 border-t-black">
            <tr>
              <th className="py-2 px-4 border-b w-1/8 text-[14px] font-medium">
                게시 날짜
              </th>
              <th className="py-2 px-4 border-b border-l border-r w-3/4 text-[14px] font-medium">
                제목
              </th>
              <th className="py-2 px-4 border-b w-1/8 text-[14px] font-medium">
                작성자
              </th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((item) => (
              <tr key={item.boardId} className="hover:bg-gray-100">
                {/* 게시 날짜 */}
                <td
                  className={`flex align-middle justify-center py-2 px-4 border-b text-[14px] ${
                    item.notice ? 'font-bold' : ''
                  }`}
                >
                  {formatDate(item.createdDate)}
                </td>
                {/* 제목 */}
                <td className="py-2 px-2.5 border-b border-l border-r text-[14px]">
                  <Link
                    href={{
                      pathname: `/board/info`,
                      query: { boardId: item.boardId },
                    }}
                  >
                    {item.notice && (
                      <span className="text-[10px] bg-[#D2FA64] px-2 py-1 rounded-[10px]">
                        공지
                      </span>
                    )}
                    <span
                      className={`pl-1 cursor-pointer ${
                        item.notice ? 'font-bold' : ''
                      }`}
                    >
                      {item.boardTitle}
                    </span>
                  </Link>
                </td>

                {/* 작성자 */}
                <td className="flex align-middle justify-center py-2 px-4 border-b text-[14px]">
                  {item.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div />
      </div>
    </div>
  )
}

export default BoardList
