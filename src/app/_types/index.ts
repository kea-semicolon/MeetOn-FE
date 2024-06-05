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
