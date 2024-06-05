'use client'

import { KakaoIcon } from '@/_assets/Icons'
import Image from 'next/image'
import login from '@/_assets/Images/login.png'
import logo from '@/_assets/Images/logo.png'

export default function Login() {
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`
  }
  return (
    <div className="bg-[#1D1D1D] px-12 py-10 flex h-screen">
      <div className="ml-8 mt-32">
        <div className="text-[#FFFFFF]">
          <Image className="w-[171px]" src={logo} alt="logo" />
          <h1 className="text-[40px] font-bold">
            서비스에 오신 것을 환영합니다!
          </h1>
          <p className="text-[20px] my-5 font-thin">
            데스크탑과 브라우저에서 bbang을 사용할 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="w-[470px] -ml-1 mt-32 flex h-[60px] items-center justify-center gap-2 rounded-[7px] bg-[#FEE500]"
        >
          <div className="mt-1 flex">
            <Image
              src={KakaoIcon}
              className="mr-3 mt-0.5 h-[25px] w-[26px]"
              alt="kakao"
            />
            <p className="text-[21px]">카카오계정으로 로그인</p>
          </div>
        </button>
      </div>
      <Image className="ml-auto w-[500px]" src={login} alt="login" />
    </div>
  )
}
