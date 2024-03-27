'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const LoginHandler = () => {
  const [code, setCode] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeURL = new URL(window.location.href).searchParams.get('code')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCode(codeURL)
      if (codeURL) {
        axios
          .post('http://localhost:8080/oauth/callback/kakao', { code: codeURL })
          .then((response) => {
            // 요청이 성공할 경우 토큰을 받아옴
            const { token } = response.data
            localStorage.setItem('accessToken', token)
          })
          .catch((error) => {
            console.error('Error fetching token:', error)
          })
      }
    }
  }, [])
  return <div>{code && <p>{code}</p>}</div>
}

export default LoginHandler
