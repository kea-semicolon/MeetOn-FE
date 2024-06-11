import api from '@/_service/axios'
import { router } from 'next/client'

const minutesInfo = async () => {
  try {
    return await api.get('/meeting-minutes/list').then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default minutesInfo
