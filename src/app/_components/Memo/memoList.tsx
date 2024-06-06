import useGetMemo from '@/_hook/useGetMemo'
import { useState } from 'react'
import { MemoInfo } from '@/_types'
import Image from 'next/image'
import { MemoPlus } from '@/_assets/Icons'

export default function MemoList({
  setCurrentView,
  setSelectedContent,
}: {
  setCurrentView: (view: boolean) => void
  setSelectedContent: (content: string) => void
}) {
  const { data } = useGetMemo()
  const [memoList, setMemoList] = useState<MemoInfo[]>(data?.memoList || [])

  const defaultCells = Array.from({ length: 10 }, (_, index) => index)
  const handleMemoPlusClick = () => {
    setCurrentView(!setCurrentView)
  }
  const handleMemoClick = (content: string) => {
    setSelectedContent(content)
    setCurrentView(false)
  }
  return (
    <div>
      <table className="w-full bg-[#FDFFE8] bg-opacity-60 text-center mt-5">
        <thead>
          <tr className="">
            <td className="py-4 w-44 border-r-[0.5px] border-r-[#FF2D2D]">
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
                {memoList[index]?.createdDate
                  ?.slice(0, 10)
                  .replace(/-/g, '.') || ''}
              </td>
              <td
                onClick={() => handleMemoClick(memoList[index]?.content || '')}
                className="py-2 text-left pl-5 cursor-pointer"
                style={{ height: '40px' }}
              >
                {memoList[index]?.content?.length > 20
                  ? `${memoList[index].content.slice(0, 40)}···`
                  : memoList[index]?.content || ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="flex ml-auto mb-7"
        onClick={handleMemoPlusClick}
      >
        <Image className="" src={MemoPlus} alt="memoplus" />
      </button>
    </div>
  )
}
