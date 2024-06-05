export interface CreateChannelInfo {
  userNickname: string
  userAuth: string
  channelName: string
}

export interface ScheduleInfo {
  scheduleId: number
  title: string
  startTime: string
  endTime: string
}

export interface Schedule {
  result: ScheduleInfo[]
}

export interface MemberInfo {
  userNickname: string
  userImage: string
  isSignedUp: boolean
}

export interface CodeInfo {
  code: string
}

export interface User {
  userId: number
  userImage: string
  userNickname: string
  authority: string
  userEmail: string
  createdAt: string
}

export interface Member {
  userList: User[]
}

export interface MemoInfo {
  content: string
  createdDate: string
  memoId: number
}

export interface Memo {
  memoList: MemoInfo[]
}
