// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components'
import { ChatFace, User } from '@/_components/chat/chatroom/common/interface'
import { ProfileImage } from '@/_components/chat/chatroom/Item'

interface ChatItemProps {
  chat: ChatFace
  isCurUser: boolean
  noProfile: boolean
  sender: User
}

const ChatItem = ({ chat, isCurUser, sender, noProfile }: ChatItemProps) => {
  const time = String(new Date(chat.date).getHours()).padStart(2, '0')
  const minute = String(new Date(chat.date).getMinutes()).padStart(2, '0')

  return (
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    <Wrapper isCurUser={isCurUser} isMargin={!noProfile}>
      {isCurUser ? (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <ChatWrapper>
          <div className="time">
            {time}:{minute}
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <ChatBalloon isCurUser>{chat.text}</ChatBalloon>
        </ChatWrapper>
      ) : (
        <>
          {noProfile ? (
            <ProfileImage src={sender.profileImage} noImage />
          ) : (
            <ProfileImage src={sender.profileImage} />
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <ContentWrapper>
            {!noProfile && <div className="name">{sender.name}</div>}
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            <ChatWrapper>
              {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
              <ChatBalloon isCurUser={false}>{chat.text}</ChatBalloon>
              <div className="time">
                {time}:{minute}
              </div>
            </ChatWrapper>
          </ContentWrapper>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isCurUser: boolean; isMargin: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: ${({ isCurUser }: { isCurUser: boolean }) =>
    isCurUser ? 'flex-end' : 'flex-start'};
  width: 100%;
  margin-top: ${({ isMargin }: { isMargin: boolean }) =>
    isMargin ? '20px' : '0px'};
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const ChatWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  .time {
    font-size: 8px;
    color: grey;
  }
`
const ChatBalloon = styled.div`
  background-color: ${({ isCurUser }: { isCurUser: boolean }) =>
    isCurUser ? 'yellow' : 'white'};
  padding: 10px;
  border-radius: 5px;
  word-break: break-all;
`

export default ChatItem
