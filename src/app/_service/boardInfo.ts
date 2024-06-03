/*
import api from '@/_service/axios'
import { ApiResponse } from '@/_types'

export const getBoardList = async (page: number, size: number) => {
  try {
    const resp = await api.get<ApiResponse>('/board', {
      params: { page, size },
    })
    return {
      content: resp.data.content,
      totalElements: resp.data.totalElements,
    }
  } catch (error) {
    throw error
  }
}
*/

import api from '@/_service/axios'
import { ApiResponse } from '@/_types'

export const getBoardList = async (page: number, size: number) => {
  try {
    const resp = await api.get<ApiResponse>('/board', {
      params: { page, size },
    })
    return {
      content: resp.data.content,
      totalElements: resp.data.totalElements,
    }
  } catch (error) {
    throw error
  }
}
