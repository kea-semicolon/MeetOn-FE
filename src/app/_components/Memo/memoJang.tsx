'use client'

import useGetMemo from '@/_hook/useGetMemo'
import { useState } from 'react'
import { MemoInfo } from '@/_types'

export default function MemoJang() {
  const { data } = useGetMemo()
  const [memoList, setMemoList] = useState<MemoInfo[]>(data?.memoList || [])

  const defaultCells = Array.from({ length: 10 }, (_, index) => index)

  return (
    <table className="w-full bg-[#FFFACD] bg-opacity-50 text-center mt-5">
      <thead>
        <tr className="">
          <td className="py-4 w-44 border-r-[0.5px]  border-r-[#FF2D2D]">
            게시 날짜
          </td>
          <td className="py-4">메모 내용</td>
        </tr>
      </thead>
      <tbody className="">
        {defaultCells.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index} className="border-t-[0.5px]  border-black">
            <td
              className="py-2  border-r-[0.5px] border-r-[#FF2D2D]"
              style={{ height: '40px' }}
            >
              {memoList[index]?.createdDate?.slice(0, 10).replace(/-/g, '.') ||
                ''}
            </td>
            <td className="py-2 text-left pl-4" style={{ height: '40px' }}>
              {memoList[index]?.content?.length > 20
                ? `${memoList[index].content.slice(0, 40)}···`
                : memoList[index]?.content || ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
