import api from '@/_service/axios'
import { router } from 'next/client'

const scheduleInfo = async (year: number, month: number) => {
  try {
    return await api
      .get('/schedule', {
        params: { year, month },
      })
      .then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default scheduleInfo
