import React, { useEffect, useState } from 'react'
import api from '@/_service/axios'

interface Board {
  boardId: number
  boardTitle: string
  createdDate: string
}

const BoardPage = () => {
  const [boardList, setList] = useState<Board[] | null>(null) // Board 배열 또는 null로 초기화

  useEffect(() => {
    api
      .get('/board')
      .then((res) => {
        setList(res.data.content) // content 배열을 설정
        console.log('Board list data :', res.data.content) // 데이터 확인을 위해 content 로그
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="container">
      <div className="boardList">
        <table className="boardTable">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {boardList && // boardList가 null이 아닐 때만 매핑
              boardList.map((board, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={index}>
                  <td>{board.boardId}</td>
                  <td>{board.boardTitle}</td>
                  <td>{board.createdDate}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BoardPage
