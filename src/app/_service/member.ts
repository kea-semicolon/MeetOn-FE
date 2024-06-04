import api from '@/_service/axios'

const member = async () => {
  try {
    return await api.get('/member').then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default member
