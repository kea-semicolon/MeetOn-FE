import OpenViduFile from '@/_components/OpenVidu/OpenViduFile'
import Image from 'next/image'
import useGetMemberInfo from '@/_hook/useGetMemberInfo'
import useGetMember from '@/_hook/useGetMember'
import { Exit, Setting, UnVoice } from '@/_assets/Icons'

export default function Chat() {
  const { data: memberInfo } = useGetMemberInfo()
  const { data: memberList } = useGetMember()

  return (
    <div className="px-5 w-full h-screen bg-[#262626] text-[14px] text-[#FFFFFF]">
      <div className="flex justify-between">
        <div className="flex items-center gap-3 py-4">
          {memberInfo && (
            <Image
              className="rounded-full"
              src={memberInfo.userImage}
              alt="blank"
              width={40}
              height={40}
            />
          )}{' '}
          <p className="text-[16px]">{memberInfo.userNickname}</p>
        </div>
        <div className="flex gap-1">
          <Image src={UnVoice} alt="unvoice" />
          <Image src={Setting} alt="setting" />
          <Image src={Exit} alt="exit" />
        </div>
      </div>

      <div className="-mx-4 h-[0.5px] bg-[#444847]" />
      <div>
        <div className="my-3 flex justify-between bg-[#202020] -mx-4 px-5 h-10 items-center">
          <p>참여자</p>
          <p className="text-[10px] flex items-center justify-center bg-[#E8FF97] h-[18px] w-[18px] rounded-[1px] text-black">
            {memberList.userList.length}
          </p>
        </div>
        {memberList?.userList?.map((user) => (
          <div key={user.userId} className="flex items-center gap-2.5 my-5">
            <Image
              alt="userimage"
              width="33"
              height="33"
              src={user.userImage}
              className="rounded-full "
            />
            <div className="w-1.5 h-1.5 rounded-full bg-[#959595]" />
            <p className="text-[#959595]">{user.userNickname}</p>
          </div>
        ))}

        <div className="-mx-4 my-4 h-[0.5px] bg-[#444847]" />
      </div>

      <div className="flex bg-[#202020] -ml-4 h-[45px] fixed bottom-0 w-full">
        <input
          className="placeholder-[#444847] outline-0 items-center px-3 bg-[#202020]"
          placeholder="메세지를 입력하세요."
        />
        {/*<OpenViduFile />*/}
      </div>
    </div>
  )
}
