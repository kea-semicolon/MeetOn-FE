'use client'

import { KakaoIcon } from '@/_assets/Icons'
import Image from 'next/image'

export default function Login() {
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KEY}&redirect_uri=http://172.16.212.76:3000/login/kakao`
  }
  return (
    <div className="bg-white flex flex-col px-6 py-5 h-screen items-center">
      <div className="flex flex-col items-center">
        <div className="flex text-[40px] font-bold mt-32 mb-5">
          <h1 className="text-[#FFCD00]">Meet;</h1>
          <h1 className="text-[#4D4D4D]">ON</h1>
        </div>
        <h2 className="text-[30px] font-bold text-[#444847] mb-10">
          Meet ON 서비스에 오신 것을 환영합니다!
        </h2>
        <p className="text-[15px] text-[#444847] mb-32">
          데스크톱과 브라우저에서 MeetON을 사용할 수 있습니다.
        </p>
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className="w-1/3 mx-auto flex h-[45px] items-center justify-center gap-2 rounded-[7px] bg-[#FEE500]"
      >
        <div className="mt-1 flex">
          <Image
            src={KakaoIcon}
            className="mr-3 mt-0.5 h-[18px] w-[18px]"
            alt="kakao"
          />
          <p>카카오계정으로 로그인</p>
        </div>
      </button>
    </div>
  )
}
