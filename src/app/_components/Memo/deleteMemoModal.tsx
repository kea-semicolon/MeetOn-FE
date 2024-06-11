import React from 'react'

interface DeleteMemoModalProps {
  onClose: () => void
  onDelete: () => void
}

const DeleteMemoModal: React.FC<DeleteMemoModalProps> = ({
  onClose,
  onDelete,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-[4px] z-50">
      <div className="flex justify-center flex-col items-center w-[481px] h-[224px] rounded-[4px] bg-white">
        <div className="flex">
          <p className="text-[15px] mt-20">메모를 삭제하시겠습니까?</p>
        </div>
        <div className="flex w-full mt-auto ">
          <button
            className="text-[14px] bg-[#444847] text-white w-full h-[63px]"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="text-[14px] w-full h-[63px] bg-black  text-[#D2FA64]"
            type="button"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteMemoModal
