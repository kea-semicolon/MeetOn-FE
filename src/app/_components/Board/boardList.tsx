import React, { useEffect, useState } from 'react'
import api from '@/_service/axios'

interface BoardItem {
  boardId: number
  boardTitle: string
  username: string
  createdDate: string
  notice: boolean
}

interface ApiResponse {
  content: BoardItem[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardItem[]>([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  const getBoardList = async () => {
    try {
      const resp = await api.get<ApiResponse>('/board', {
        params: {
          page,
          size,
        },
      })
      console.log('API response:', resp.data)
      setBoardList(resp.data.content)
      console.log(resp.data.content)
    } catch (error) {
      console.error('Error fetching board list:', error)
      setBoardList([]) // 오류 발생 시 빈 배열로 설정
    }
  }

  useEffect(() => {
    getBoardList() // 게시글 목록 조회 함수 호출
  }, [page, size])

  return (
    <div>
      게시판 목록 출력
      <ul>
        {boardList &&
          boardList.map((item) => (
            <li key={item.boardId}>
              <h2>{item.boardTitle}</h2>
              <p>작성자: {item.username}</p>
              <p>작성일: {new Date(item.createdDate).toLocaleDateString()}</p>
              <p>{item.notice ? '공지사항' : ''}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BoardList
