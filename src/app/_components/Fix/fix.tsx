import Header from '@/_components/Header/header'
import MemoZone from '@/_components/Memo/memoZone'

export default function Fix() {
  return (
    <div className="ml-5 mt-4 absolute">
      <div className="ml-9">
        <Header />
      </div>
      <div className="mt-7 overflow-y-auto max-h-screen pb-32">
        <MemoZone />
      </div>
    </div>
  )
}
