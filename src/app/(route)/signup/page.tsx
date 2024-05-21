'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import usePostChannel from '@/_hook/usePostChannel'
import Modal from '@/_components/Modal/modal'
import useGetMemberInfo from '@/_hook/useGetMemberInfo'

export default function Signup() {
  const { data: memberInfo } = useGetMemberInfo()

  const [userNickname, setUserNickname] = useState<string>(
    memberInfo.userNickname,
  )
  const [userImage, setUserImage] = useState<string>(memberInfo.userImage)
  const [userAuth, setUserAuth] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false)
  const [channelName, setChannelName] = useState<string>('')

  const { mutate: createChannel } = usePostChannel()

  const openModal = () => {
    setUserAuth('host')
    setIsModalOpen(true)
    setIsOverlayVisible(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsOverlayVisible(false)
  }

  const handleCreateChannel = () => {
    // 채널생성 api 호출
    createChannel({ userNickname, channelName, userAuth, userImage })
    closeModal()
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-[513px] h-[440px] shadow-md ">
        {memberInfo && (
          <Image
            className="w-[140px] mx-auto mb-6 mt-16"
            src={userImage}
            alt="blank"
            width={140}
            height={140}
          />
        )}
        <div className="w-[186px] mx-auto">
          <input
            className="outline-none flex text-center h-[31px] text-[16px]"
            placeholder="사용자 이름"
            value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
          />
          <hr />
        </div>
        <div className="flex gap-3 justify-center mt-12">
          <button
            type="button"
            className="rounded-[6px] border text-[#FFCD00] text-center border-[#FFCD00] w-[148px] h-[50px]"
            onClick={openModal}
          >
            방 만들기
          </button>
          <button
            type="button"
            className="rounded-[6px] text-[#FFFFFF] text-center bg-[#FFCD00] w-[148px] h-[50px]"
          >
            참여하기
          </button>
        </div>
        {isOverlayVisible && (
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur" />
        )}
      </div>
      {isModalOpen && (
        <div className="absolute">
          <Modal
            onClose={closeModal}
            onCreate={handleCreateChannel}
            channelName={channelName}
            setChannelName={setChannelName}
          />
        </div>
      )}
    </div>
  )
}
