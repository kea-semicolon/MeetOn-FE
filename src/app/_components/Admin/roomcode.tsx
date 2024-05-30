import useGetCodeInfo from '@/_hook/useGetCodeInfo'

const RoomCode = () => {
  // const copyToClipboard = async () => {
  //   try {
  //     await navigator.clipboard.writeText(codeInfo.code)
  //     console.log('Code copied to clipboard!')
  //   } catch (err) {
  //     console.error('Failed to copy code: ', err)
  //   }
  // }
  return (
    <div className="px-6 py-5">
      <p className="text-[16px] font-bold">방 코드 보기</p>
      <p className="text-[14px] text-[#919191] mt-1">
        방 코드를 입력하여 회의 관리를 할 수 있습니다
      </p>
      <div className="my-8 -ml-0.5 justify-between rounded-[6px] text-[16px] flex items-center pl-3 pr-2 w-[308px] h-[48px] bg-white border border-1">
        {/*<p>{codeInfo.code}</p>*/}
        <button
          type="button"
          className="rounded-[4px] text-[14px] w-[66px] h-[32px] border border-1"
          // onClick={copyToClipboard}
        >
          복사
        </button>
      </div>
    </div>
  )
}

export default RoomCode
