export interface CreateChannelInfo {
  userImage: string
  userNickname: string
  userAuth: string
  channelName: string
}

export interface ScheduleInfo {
  map(
    arg0: (info: any) => { title: any; start: any; end: any },
  ): import('react').SetStateAction<any[]>
  title: string
  startTime: string
  endTime: string
}
