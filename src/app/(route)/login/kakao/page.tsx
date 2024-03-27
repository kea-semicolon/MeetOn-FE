'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LoginHandler = () => {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeURL = new URL(window.location.href).searchParams.get('code')
      if (codeURL) {
        axios
          .post(`http://localhost:8080/oauth/callback/kakao?code=${codeURL}`)
          .then((response) => {
            // 요청이 성공할 경우 토큰을 받아옴
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            router.push('/main')
          })
          .catch((error) => {
            console.error('Error fetching token:', error)
          })
      }
    }
  }, [router])
}

export default LoginHandler
