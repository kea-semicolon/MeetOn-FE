'use client'

// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components'
import React, { ChangeEvent, useState, useCallback } from 'react'
import { ChatFace, User } from '@/_components/chat/chatroom/common/interface'
import ChatItem from './ChatItem'

interface TestPropps {
  widthChange: () => void
  dragStart: (e: React.MouseEvent<HTMLDivElement>) => void
  curUser: number
  chats: ChatFace[]
  users: User[]
  onConcat: (text: string) => void
}

const Test = ({
  widthChange,
  dragStart,
  curUser,
  chats,
  users,
  onConcat,
}: TestPropps) => {
  // 채팅창
  const [text, setText] = useState([''])
  // input창
  const [field, setField] = useState('')
  const Chatting = (e: ChangeEvent<HTMLInputElement>) => {
    const temp = e.target.value
    setField(temp)
  }
  const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault() // 버튼을 통한 제출이라면 새로고침 방지
    // setText([...text, field])
    onConcat(field)
    setField('')
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSubmit()
      e.preventDefault() // 버튼을 통한 제출이라면 새로고침 방지
    }
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="divider cursor-col-resize w-5 bg-black"
        onMouseDown={dragStart}
      />
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <All>
          {/* <button style={{height:'5%'}} onClick={handleCloseModal}>close</button> */}
          {/* eslint-disable-next-line react/button-has-type */}
          <button style={{ height: '5%' }} onClick={widthChange}>
            close
          </button>
          {/* <div className="right-pane" style={{width:'100%', display: 'flex', height: '85%', backgroundColor:'blue'}}> */}
          {/* </div> */}
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <Chat>
            {chats.map((chat, idx) => (
              <ChatItem
                key={chat.id}
                noProfile={
                  idx !== 0 && chats[idx - 1].senderId === chat.senderId
                }
                isCurUser={curUser === chat.senderId}
                chat={chat}
                sender={users[chat.senderId]}
              />
            ))}
          </Chat>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <Wrapper onSubmit={onSubmit}>
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            <InputField
              required
              value={field}
              onChange={Chatting}
              placeholder="메세지를 입력하세요"
              onKeyPress={handleEnter}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            <SendButton>전송</SendButton>
          </Wrapper>
        </All>
        {/* eslint-disable-next-line react/button-has-type */}
      </div>
    </>
  )
}

const All = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
`

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  height: 80%;
  overflow-y: auto; /* 세로 스크롤 적용 */
  overflow-x: auto; /* 세로 스크롤 적용 */
  background-color: powderblue;
`

const Wrapper = styled.form`
  display: flex;
  height: 15%;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  background-color: white;
`
const InputField = styled.textarea`
  flex: 1;
  border: none;
  padding: 10px;
  word-break: break-all;
`
const SendButton = styled.button`
  width: 80px;
  background-color: yellow;
  border: none;
  border-radius: 5px;
`

export default Test
