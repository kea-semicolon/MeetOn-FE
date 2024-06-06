import React from 'react'

interface DeletePostModalProps {
  onClose: () => void
  onDelete: () => void
}

const DeleteBoardModal: React.FC<DeletePostModalProps> = ({
  onClose,
  onDelete,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="gap-7 flex justify-center flex-col items-center w-[481px] h-[246px] rounded-[18px] bg-white">
        <div className="flex">
          <p className="text-[15px]">게시글을 삭제하시겠습니까?</p>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            className="text-[14px] border border-[#959595] rounded-[6px] w-[150px] h-[48px]"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="text-[14px] border border-[#959595] rounded-[6px] w-[150px] h-[48px] text-[#FF2D2D]"
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

export default DeleteBoardModal
