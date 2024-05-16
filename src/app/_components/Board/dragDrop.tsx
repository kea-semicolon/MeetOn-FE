import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react'
import Image from 'next/image'
import { Cancel, AddFile } from '@/_assets/Icons'

interface IFileTypes {
  id: number
  object: File
}

const DragDrop = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [files, setFiles] = useState<IFileTypes[]>([])

  const dragRef = useRef<HTMLLabelElement | null>(null)
  const fileId = useRef<number>(0)

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = []
      let tempFiles: IFileTypes[] = files

      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files
      } else {
        selectFiles = e.target.files
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            // eslint-disable-next-line no-plusplus
            id: fileId.current++,
            object: file,
          },
        ]
      }

      setFiles(tempFiles)
    },
    [files],
  )

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: IFileTypes) => file.id !== id))
    },
    [files],
  )

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer!.files) {
      setIsDragging(true)
    }
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault()
      e.stopPropagation()

      onChangeFiles(e)
      setIsDragging(false)
    },
    [onChangeFiles],
  )

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn)
      dragRef.current.addEventListener('dragleave', handleDragOut)
      dragRef.current.addEventListener('dragover', handleDragOver)
      dragRef.current.addEventListener('drop', handleDrop)
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn)
      dragRef.current.removeEventListener('dragleave', handleDragOut)
      dragRef.current.removeEventListener('dragover', handleDragOver)
      dragRef.current.removeEventListener('drop', handleDrop)
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  useEffect(() => {
    initDragEvents()

    return () => resetDragEvents()
  }, [initDragEvents, resetDragEvents])

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full">
        <input
          type="file"
          id="fileUpload"
          multiple
          onChange={onChangeFiles}
          className="hidden"
        />

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className={`w-full flex-col gap-3 h-32 border border-dashed rounded-[4px] flex items-center justify-center cursor-pointer ${
            isDragging
              ? 'border-blue-500 bg-blue-100 font-semibold'
              : 'border-[#959595]'
          }`}
          htmlFor="fileUpload"
          ref={dragRef}
        >
          <div className="w-9 h-9 pointer-events-none">
            <Image src={AddFile} alt="파일 추가" />
          </div>
          <p className="text-[14px] text-[#959595]">
            첨부할 파일을 드래그하여 해당 위치에 놓아주세요
          </p>
        </label>

        <div className="flex flex-wrap">
          {files.map((file: IFileTypes, index: number) => {
            const {
              id,
              object: { name },
            } = file

            return (
              <div key={id} className="flex pt-2">
                <div className="flex bg-[#FFFFFF] border border-[#959595] px-4 py-1.5 rounded-full text-[12px] mr-4">
                  {name}
                  <div className="flex content-center pl-2">
                    <Image
                      src={Cancel}
                      alt="x"
                      onClick={() => handleFilterFile(id)}
                    />
                  </div>
                </div>
              </div>
            )

            // 다음 줄로 넘어감
            if ((index + 1) % 2 === 0) {
              return <div className="w-full" key={id} />
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default DragDrop
