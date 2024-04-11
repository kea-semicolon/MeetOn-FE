import RoomCode from '@/_components/Admin/roomcode'
import Userlist from '@/_components/Admin/userlist'

const Admin = () => {
  return (
    <div className="w-3/5 absolute bg-[#F8F9FB] ">
      <p className="px-6 py-4 text-[20px] font-bold">회의 관리</p>
      <hr />
      <RoomCode />
      <hr />
      <Userlist />
    </div>
  )
}

export default Admin
