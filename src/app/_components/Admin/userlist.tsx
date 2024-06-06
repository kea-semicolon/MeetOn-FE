'use client'

import { useEffect, useState } from 'react'
import { DeleteUser } from '@/_assets/Icons'
import Image from 'next/image'
import useGetMember from '@/_hook/useGetMember'

const UserList = () => {
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const { data } = useGetMember()

  const [checkboxes, setCheckboxes] = useState<
    { id: number; checked: boolean }[]
  >([])

  useEffect(() => {
    if (data?.userList) {
      const initialCheckboxes = data.userList.map((user) => ({
        id: user.userId,
        checked: false,
      }))
      setCheckboxes(initialCheckboxes)
    }
  }, [data])

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
            {data?.userList?.map((user) => (
              <tr key={user.userId} className="border bg-[#FFFFFF]">
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <td className="py-4">
                  <div>
                    <input
                      className="py-1.5 mt-1.5"
                      type="checkbox"
                      checked={
                        checkboxes.find(
                          (checkbox) => checkbox.id === user.userId,
                        )?.checked || false
                      }
                      onChange={() => handleCheckboxChange(user.userId)}
                    />
                  </div>
                </td>
                <td className="py-4">{user.userNickname}</td>
                <td className="py-4">{user.userEmail}</td>
                <td className="py-4">
                  {user.createdAt.slice(0, 10).replace(/-/g, '.')}
                </td>
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

export default UserList
