export interface CreateChannelInfo {
  userNickname: string
  userAuth: string
  channelName: string
}

export interface MemberInfo {
  userNickname: string
  userImage: string
  isSignedUp: boolean
}

export interface CodeInfo {
  code: string
}
