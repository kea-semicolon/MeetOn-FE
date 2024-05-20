import React, { useEffect, useState } from 'react'
import api from '@/_service/axios'
import { useRouter } from 'next/navigation'
import Search from '@/_components/Board/search'
import Image from 'next/image'
import { Write } from '@/_assets/Icons'

interface BoardItem {
  id: number
  title: string
  content: string
}

const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardItem[]>([])

  const getBoardList = async () => {
    try {
      const resp = await api.get<{ content: BoardItem[] }>('/board')
      if (resp.data && Array.isArray(resp.data.content)) {
        setBoardList(resp.data.content)
        console.log('get board list success')
        console.log('board data:', resp.data.content)
      } else {
        console.log('Invalid response format:', resp.data)
      }
    } catch (error) {
      console.error('Error fetching board list:', error)
      setBoardList([]) // 오류 발생 시 빈 배열 설정
    }
  }

  useEffect(() => {
    getBoardList()
  }, [])

  const router = useRouter()
  const moveToWrite = () => {
    router.push('/board/write')
  }

  return (
    <div className="ml-4 mr-4 pl-4 pr-4 pt-7 bg-white rounded-[12px]">
      <div className="flex justify-between items-center">
        <button
          onClick={moveToWrite}
          className="pt-1.5 pb-1.5 pl-5 pr-5 border border-[#FFCD00] rounded-[4px] flex justify-center items-center text-[#FFCD00] text-[14px]"
        >
          <Image src={Write} alt="" className="mr-1" />
          글쓰기
        </button>
        <Search />
      </div>
      <div>
        <ul>
          {boardList.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BoardList
