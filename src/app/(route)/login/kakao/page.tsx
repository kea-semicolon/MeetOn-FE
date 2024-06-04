'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const LoginHandler = () => {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeURL = new URL(window.location.href).searchParams.get('code')
      if (codeURL) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth/callback/kakao?code=${codeURL}`,
            {},
            { withCredentials: true },
          )
          .then((response) => {
            // 요청이 성공할 경우 토큰을 받아옴
            const accessTokenExpiry = new Date()
            accessTokenExpiry.setTime(
              accessTokenExpiry.getTime() + 24 * 60 * 60 * 1000,
            )
            Cookies.set('accessToken', response.data.accessToken, {
              expires: accessTokenExpiry,
              path: '/',
              domain: 'oguogu.store',
            })
            const refreshTokenExpiry = new Date()
            refreshTokenExpiry.setTime(
              refreshTokenExpiry.getTime() + 3 * 24 * 60 * 60 * 1000,
            )
            Cookies.set('refreshToken', response.data.refreshToken, {
              expires: refreshTokenExpiry,
              path: '/',
              domain: 'oguogu.store',
            })
            Cookies.set('memberId', response.data.memberId, {
              expires: refreshTokenExpiry,
              path: '/',
              domain: 'oguogu.store',
            })
            Cookies.set('channelId', response.data.channelId, {
              expires: refreshTokenExpiry,
              path: '/',
              domain: 'oguogu.store',
            })
            router.push('/admin')
          })
          .catch((error) => {
            console.error('Error fetching token:', error)
          })
      }
    }
  }, [router])
}

export default LoginHandler
