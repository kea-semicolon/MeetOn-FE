import api from '@/_service/axios'

const memo = async () => {
  try {
    return await api.get('/memo').then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default memo
