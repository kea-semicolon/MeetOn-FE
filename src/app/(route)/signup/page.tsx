'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import blank from '@/_assets/Icons/blank.svg'
import usePostChannel from '@/_hook/usePostChannel'
import Modal from '@/_components/Modal/modal'

export default function Signup() {
  const [userNickname, setUserNickname] = useState<string>('')
  const [userImage, setUserImage] = useState<string>(
    'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=',
  )
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
        <Image
          className="w-[140px] mx-auto mb-6 mt-16"
          src={blank}
          alt="blank"
        />
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
          <Modal onClose={closeModal} onCreate={handleCreateChannel} />
        </div>
      )}
    </div>
  )
}
