import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Search from '@/_components/Board/search'
import { Write } from '@/_assets/Icons'
import { useRouter } from 'next/navigation'
import useGetBoard from '@/_hook/useGetBoard'

const BoardList: React.FC = () => {
  const router = useRouter()
  const { data, error, isLoading } = useGetBoard(0, 100) // Updated usage

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>Data is undefined</div>
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
            {data.content.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-10 py-10 text-center text-[14px]">
                  작성된 게시글이 없습니다.
                </td>
              </tr>
            ) : (
              data.content.map((item) => (
                <tr key={item.boardId} className="hover:bg-gray-100">
                  <td
                    className={`flex align-middle justify-center py-2 px-4 border-b text-[14px] ${
                      item.notice ? 'font-bold' : ''
                    }`}
                  >
                    {formatDate(item.createdDate)}
                  </td>
                  <td className="py-2 px-2.5 border-b border-l border-r text-[14px]">
                    <Link
                      href={{
                        pathname: `/board/info`,
                        query: { boardId: item.boardId },
                      }}
                    >
                      <div className="flex items-center">
                        {item.notice && (
                          <span className="bg-[#D2FA64] rounded-[10px] mr-0.5 px-2 py-0.5 text-[10px]">
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
                      </div>
                    </Link>
                  </td>
                  <td className="flex align-middle justify-center py-2 px-4 border-b text-[14px]">
                    {item.username}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BoardList
