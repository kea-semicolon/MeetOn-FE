import api from '@/_service/axios'

const ScheduleInfo = async () => {
  try {
    return await api.get('/schedule').then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default ScheduleInfo
