import OpenViduFile from '@/_components/OpenVidu/OpenViduFile'
import Image from 'next/image'
import useGetMemberInfo from '@/_hook/useGetMemberInfo'

export default function Chat() {
  const { data: memberInfo } = useGetMemberInfo()

  return (
    <div className="px-4 w-full h-screen bg-[#262626] text-[14px] text-[#FFFFFF]">
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
      <div className="-mx-4 h-[0.5px] bg-[#444847]" />
      <div>
        <div className="my-3 flex justify-between bg-[#202020] -mx-4 px-5 h-10 items-center">
          <p>참여자</p>
          <p className="text-[10px] flex items-center justify-center bg-[#E8FF97] h-[18px] w-[18px] rounded-[1px] text-black">
            4
          </p>
        </div>
        <div className="flex items-center gap-2.5 my-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full " />
          <div className="w-1.5 h-1.5 rounded-full bg-[#21EC00]" />
          <p>김철수</p>
        </div>
        <div className="flex items-center gap-2.5 my-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full " />
          <div className="w-1.5 h-1.5 rounded-full bg-[#21EC00]" />
          <p>최영희</p>
        </div>
        <div className="flex items-center gap-2.5 my-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full " />
          <div className="w-1.5 h-1.5 rounded-full bg-[#959595]" />
          <p>박미자</p>
        </div>
        <div className="flex items-center gap-2.5 my-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full " />
          <div className="w-1.5 h-1.5 rounded-full bg-[#959595]" />
          <p>오춘자</p>
        </div>
        <div className="-mx-4 my-4 h-[0.5px] bg-[#444847]" />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex justify-between items-center">
          <p>오춘자 : 안녕하세요</p>
          <p className="text-[#959595] text-[10px]">01:22 PM</p>
        </div>
        <div className="flex justify-between items-center">
          <p>김철수 : 하이하이</p>
          <p className="text-[#959595] text-[10px]">01:56 PM</p>
        </div>
        <div className="flex justify-between items-center">
          <p>최영희 : 회의하자~</p>
          <p className="text-[#959595] text-[10px]">02:59 PM</p>
        </div>
      </div>
      <div className="flex bg-[#202020] -ml-4 h-[45px] fixed bottom-0 w-full">
        <input
          className="placeholder-[#444847] outline-0 items-center px-3 bg-[#202020]"
          placeholder="메세지를 입력하세요."
        />
        <OpenViduFile />
      </div>
    </div>
  )
}
