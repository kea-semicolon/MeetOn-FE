export interface CreateChannelInfo {
  userImage: string
  userNickname: string
  userAuth: string
  channelName: string
}

export interface CreateBoardInfo {
  title: string
  content: string
  isNotice: boolean
  fileList: File[]
}
