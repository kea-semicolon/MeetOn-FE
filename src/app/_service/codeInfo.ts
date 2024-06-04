import api from '@/_service/axios'
import { NextApiResponse } from 'next'

const codeInfo = async () => {
  try {
    const response = await api.get('/channel/code')
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default codeInfo
