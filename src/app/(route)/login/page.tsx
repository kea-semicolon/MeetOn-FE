'use client'

import { KakaoIcon } from '@/_assets/Icons'
import Image from 'next/image'

export default function Login() {
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KEY}&redirect_uri=http://localhost:3000/login/kakao`
  }
  return (
    <div className="flex flex-col px-6 py-5 h-screen">
      <div className="font-xs mb-5 text-center text-[#959595] mt-52">
        SNS로 간편하게 가입하기
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className="w-1/2 mx-auto flex h-[45px] items-center justify-center gap-2 rounded-[3rem] bg-[#FEE500]"
      >
        <div className="mt-1 flex">
          <Image
            src={KakaoIcon}
            className="mr-3 mt-0.5 h-[18px] w-[18px]"
            alt="kakao"
          />
          <p>카카오톡으로 로그인</p>
        </div>
      </button>
    </div>
  )
}
