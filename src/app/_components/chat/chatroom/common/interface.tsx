export interface User {
  id: number
  name: string
  profileImage: string
  message: string
}

export interface ChatFace {
  id: number
  senderId: number
  text: string
  date: string
}
