import MemoList from '@/_components/Memo/memoList'
import MemoJang from '@/_components/Memo/memoJang'
import { useState } from 'react'

export default function MemoPage() {
  const [currentView, setCurrentView] = useState(true)
  const [selectedContent, setSelectedContent] = useState<string>('')

  return (
    <div className="px-4 pb-7 flex flex-col text-[14px] w-3/5 absolute bg-[#F8F9FB]">
      <h1 className="text-[20px] font-bold mt-4 pl-2">메모장</h1>
      {currentView && (
        <MemoList
          setCurrentView={setCurrentView}
          setSelectedContent={setSelectedContent}
        />
      )}
      {!currentView && (
        <MemoJang
          setCurrentView={setCurrentView}
          selectedContent={selectedContent}
        />
      )}
    </div>
  )
}
