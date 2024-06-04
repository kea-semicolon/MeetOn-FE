import Image from 'next/image'
import { DeleteUser } from '@/_assets/Icons'
import useGetMember from '@/_hook/useGetMember'

export default function MemoPage() {
  const { data } = useGetMember()

  return (
    <div className="flex flex-col text-[14px] w-3/5 absolute ">
      <table className="w-full bg-[#FFFACD] text-center mt-7">
        <thead>
          <tr className="">
            <td className="py-4 w-44 border-r-[0.5px]  border-r-[#FF2D2D]">
              게시 날짜
            </td>
            <td className="py-4">메모 내용</td>
          </tr>
        </thead>
        <tbody className="">
          {data?.userList?.map((user) => (
            <tr key={user.userId} className="border-t-[0.5px]  border-black">
              <td className="py-2  border-r-[0.5px] border-r-[#FF2D2D] border-double">
                {user.createdAt.slice(0, 10).replace(/-/g, '.')}
              </td>
              <td className="py-2">{user.userEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
