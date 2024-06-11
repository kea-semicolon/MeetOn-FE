import api from '@/_service/axios'

const whenToMeet = async () => {
  try {
    return await api.get('/when-to-meet').then((res) => res.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

export default whenToMeet
