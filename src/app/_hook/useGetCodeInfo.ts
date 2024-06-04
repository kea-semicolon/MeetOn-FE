import { useSuspenseQuery } from '@tanstack/react-query'
import { CodeInfo } from '@/_types'
import codeInfo from '@/_service/codeInfo'
import { useEffect } from 'react'

const useGetCodeInfo = () => {
  const queryKey = ['codeInfo']

  return useSuspenseQuery<CodeInfo, Error>({
    queryKey,
    queryFn: codeInfo,
  })
}

export default useGetCodeInfo
