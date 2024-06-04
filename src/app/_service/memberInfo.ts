import api from '@/_service/axios'

const memberInfo = async () => {
  try {
    return await api.get('/member/info').then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default memberInfo
