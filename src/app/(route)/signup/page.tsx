'use client'

import { useState } from 'react'
import Image from 'next/image'
import usePostChannel from '@/_hook/usePostChannel'
import Modal from '@/_components/Modal/modal'
import useGetMemberInfo from '@/_hook/useGetMemberInfo'
import usePatchMember from '@/_hook/usePatchMember'

export default function Signup() {
  const { data: memberInfo } = useGetMemberInfo()

  const [userNickname, setUserNickname] = useState<string>(
    memberInfo.userNickname,
  )
  const [userAuth, setUserAuth] = useState<string>('')
  const [channelName, setChannelName] = useState<string>('')
  const [channelCode, setChannelCode] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false)

  const { mutate: createChannel } = usePostChannel()
  const { mutate: joinChannel } = usePatchMember()

  const openModal = () => {
    setUserAuth('host')
    setIsModalOpen(true)
    setIsOverlayVisible(true)
  }
  const openModal2 = () => {
    setUserAuth('client')
    setIsModalOpen2(true)
    setIsOverlayVisible(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setIsModalOpen2(false)
    setIsOverlayVisible(false)
  }

  const handleCreateChannel = () => {
    if (userAuth === 'host') {
      createChannel({ userNickname, channelName, userAuth })
    } else if (userAuth === 'client') {
      joinChannel({
        userNickname,
        userAuth: 'member',
        channelCode: channelName,
      })
    }
    closeModal()
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-[513px] h-[440px] shadow-md ">
        {memberInfo && (
          <Image
            className="rounded-full mx-auto mb-6 mt-16"
            src={memberInfo.userImage}
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
            onClick={openModal2}
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
            hostStatus="방 이름을 입력하세요"
            onClose={closeModal}
            onCreate={handleCreateChannel}
            channelName={channelName}
            setChannelName={setChannelName}
          />
        </div>
      )}
      {isModalOpen2 && (
        <div className="absolute">
          <Modal
            hostStatus="방 코드를 입력하세요"
            onClose={closeModal}
            onCreate={handleCreateChannel}
            channelName={channelCode}
            setChannelName={setChannelCode}
          />
        </div>
      )}
    </div>
  )
}
