'use client'

import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import Test from '@/_components/chat/chatroom/Test'
import userData from '@/_components/chat/chatroom/data/userData.json'
import chatData from '@/_components/chat/chatroom/data/chatData.json'
import { ChatFace } from '@/_components/chat/chatroom/common/interface'

export default function PracticePage() {
  const curRoom = chatData.rooms[1]
  const [chats, setChats] = useState<ChatFace[]>(curRoom.chats)
  const { users } = userData

  const [curUser, setCurUser] = useState(0)
  const nextChatId = useRef(chats.length + 1)

  const [isVisible, setIsVisible] = useState(false) // 컴포넌트의 가시성을 관리하는 상태

  const changeIsVisible = () => {
    setIsVisible(!isVisible)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setLeftWidth(70)
  }
  const changeClose = () => {
    setIsVisible(!isVisible)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setLeftWidth(100)
  }

  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const [leftWidth, setLeftWidth] = useState(100) // 초기 너비 비율(%)
  const [dragging, setDragging] = useState(false)

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true)
    e.preventDefault() // 기본 이벤트 방지
  }

  const stopDragging = () => {
    setDragging(false)
  }

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const newWidth = (e.clientX / window.innerWidth) * 100
      setLeftWidth(newWidth)
    }
  }

  const onConcat = useCallback(
    (text: string) => {
      const chat = {
        id: nextChatId.current,
        senderId: curUser,
        text,
        date: String(new Date()),
      }
      setChats(chats.concat(chat))
      // eslint-disable-next-line no-plusplus
      nextChatId.current++
    },
    [chats, curUser],
  )

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="h-screen flex"
      onMouseMove={onDrag}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
    >
      <div className="w-100">
        <p>left</p>
      </div>
      <div
        className="bg-gray-100 overflow-x-auto whitespace-nowrap"
        style={{
          width: `${leftWidth}%`,
        }}
      >
        <div>
          <p className="flex left-0 top-0">
            내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내
          </p>
          {!isVisible && (
            // eslint-disable-next-line react/button-has-type
            <button onClick={() => changeIsVisible()}>토글 버튼</button>
          )}
          {showModal && (
            <div className="w-full">
              <div>
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isVisible && (
        <Test
          dragStart={startDragging}
          widthChange={changeClose}
          curUser={curUser}
          users={users}
          chats={chats}
          onConcat={onConcat}
        />
      )}
    </div>
  )
}
