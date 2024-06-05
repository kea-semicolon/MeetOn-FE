import MemoJang from '@/_components/Memo/memoJang'

export default function MemoPage() {
  return (
    <div className="px-4 flex flex-col text-[14px] w-3/5 absolute bg-[#F8F9FB]">
      <h1 className="text-[20px] font-bold mt-4 pl-2">메모장</h1>
      <MemoJang />
    </div>
  )
}
