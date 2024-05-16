import api from '@/_service/axios'

export const UseGetBoardList = async () => {
  try {
    return await api.get('/board').then((res) => res.data)
  } catch (error) {
    throw error
  }
}
