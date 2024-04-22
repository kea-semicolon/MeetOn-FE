import Header from '@/_components/Header/header'
import MemoZone from '@/_components/Memo/memoZone'
import Chat from '@/_components/Chat/chat'

export default function Fix() {
  return (
    <div className="ml-5 mt-4 w-screen absolute">
      <div className="-mt-4 h-screen w-1/5 fixed right-0">
        <Chat />
      </div>
      <div className="ml-9">
        <Header />
      </div>
      <div className="flex">
        <div className="mt-7 w-1/6 overflow-y-auto max-h-screen pb-32">
          <MemoZone />
        </div>
      </div>
    </div>
  )
}
