import Search from '@/_components/Board/search'
import Image from 'next/image'
import { Write } from '@/_assets/Icons'
import { useRouter } from 'next/navigation'

const BoardList = () => {
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
      <div>게시판 글 출력</div>
      <div>페이징</div>
    </div>
  )
}

export default BoardList
