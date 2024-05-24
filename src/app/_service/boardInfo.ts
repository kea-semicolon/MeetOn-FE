import api from '@/_service/axios'

const boardInfo = async () => {
  try {
    return await api.get('/board').then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default boardInfo
