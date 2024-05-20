import React, { useState, ChangeEvent } from 'react'
import usePostBoard from '@/_hook/usePostBoard'
import DragDrop from './dragDrop'

const BoardWrite = () => {
  const [title, setTitle] = useState('')
  const [isNotice, setIsNotice] = useState(false)
  const [fileList, setFileList] = useState<string[]>([])
  const [content, setContent] = useState('')

  const { mutate: createPost } = usePostBoard() // usePostBoard 훅을 사용합니다.

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    // 파일 추가 로직 구현
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      console.log(title, isNotice, fileList, content)
      createPost({ title, isNotice, fileList, content })
    } catch (error) {
      console.error('Error while posting board:', error)
    }
  }

  return (
    <div className="w-3/5 h-full absolute bg-[#F8F9FB]">
      <p className="px-6 py-4 text-[20px] font-bold">게시판</p>
      <div className="ml-4 mr-4 pl-4 pr-4 pt-4 bg-white rounded-[12px]">
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="flex-1 mr-4 px-3 py-2 border border-[#959595] rounded-[3px] text-[14px]"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isNotice"
              checked={isNotice}
              onChange={() => setIsNotice(!isNotice)}
              className="mr-2"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="isNotice" className="text-[14px]">
              공지
            </label>
          </div>
        </div>
        <div className="mb-4">
          <DragDrop />
        </div>
        <div>
          <textarea
            className="mb-4 w-full h-96 px-3 py-2 border border-[#959595] rounded-[3px] text-[14px]"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="pb-4 flex justify-end">
          <button
            className="bg-white text-[14px] text-black px-5 py-1.5 rounded-[4px] border border-[#959595]"
            onClick={handleSubmit}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default BoardWrite
