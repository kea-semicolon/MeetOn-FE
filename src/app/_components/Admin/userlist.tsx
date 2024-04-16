'use client'

import { useState } from 'react'
import { DeleteUser } from '@/_assets/Icons'
import Image from 'next/image'

const Userlist = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, checked: false },
    { id: 2, checked: false },
    // 추가적인 체크박스가 있다면 여기에 계속 추가할 수 있습니다.
  ])

  // 전체 선택/해제 체크박스 이벤트 핸들러
  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    setCheckboxes(
      checkboxes.map((checkbox) => ({ ...checkbox, checked: !selectAll })),
    )
  }

  // 하위 체크박스 변경 이벤트 핸들러
  const handleCheckboxChange = (id: number) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox,
    )
    setCheckboxes(updatedCheckboxes)
    setSelectAll(updatedCheckboxes.every((checkbox) => checkbox.checked))
  }

  return (
    <div className="px-6 py-5 ">
      <p className="text-[16px] font-bold">사용자 목록</p>
      <p className="text-[14px] text-[#919191] mt-1">
        회의를 위한 사용자 관리를 할 수 있습니다.
      </p>
      <div className="flex flex-col text-[14px]">
        <table className="w-full text-center mt-7">
          <thead>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td className="px-2 pt-0.5">
                <div>
                  <input
                    className="py-1.5 bg-[#2AE40C]"
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>
              </td>
              <td className="py-1.5">이름</td>
              <td className="py-1.5">계정 이메일</td>
              <td className="py-1.5">가입 날짜</td>
              <td className="py-1.5 px-2">삭제</td>
            </tr>
          </thead>
          <tbody>
            {checkboxes.map((checkbox) => (
              <tr key={checkbox.id} className="border bg-[#FFFFFF]">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <td className="py-4">
                  <div>
                    <input
                      className="py-1.5 mt-1.5"
                      type="checkbox"
                      checked={checkbox.checked}
                      onChange={() => handleCheckboxChange(checkbox.id)}
                    />
                  </div>
                </td>
                <td className="py-4">박미자</td>
                <td className="py-4">abcde123@gmail.com</td>
                <td className="py-4">2024.04.08</td>
                <td className="py-4 flex justify-center">
                  <div className="">
                    <Image src={DeleteUser} alt="deleteuser" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-[14px] flex gap-2 ml-auto my-3">
          <button
            className="border w-[94px] h-[32px] bg-[#FFFFFF] rounded-[4px]"
            type="button"
          >
            선택 삭제
          </button>
          <button
            className="border w-[94px] h-[32px] bg-[#FFFFFF] rounded-[4px] text-[#FF2D2D]"
            type="button"
          >
            채널 삭제
          </button>
        </div>
      </div>
    </div>
  )
}

export default Userlist
