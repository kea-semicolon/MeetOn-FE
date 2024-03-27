'use client'

export default function Login() {
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=&redirect_uri=http://localhost:3000/login/kakao`
  }
  return (
    <div className="flex flex-col bg-gray-200 h-screen">
      <button
        type="button"
        onClick={handleLogin}
        className="mt-[50%] bg-[#FEE500] text-[15px] text-black mx-auto rounded-[8px] hover:bg-amber-300"
      >
        카카오로 로그인
      </button>
    </div>
  )
}
