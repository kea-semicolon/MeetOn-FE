import React, { useState } from 'react'
import { SearchImg } from '@/_assets/Icons'
import Image from 'next/image'
import '@/_styles/search.css'

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOption, setSearchOption] = useState('title')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOption(e.target.value)
  }

  const handleSearch = () => {
    // search logic 추가
    console.log('검색어:', searchQuery)
    console.log('검색 옵션:', searchOption)
    // after search
  }

  return (
    <div className="flex w-fit">
      <select
        value={searchOption}
        onChange={handleOptionChange}
        className="mr-2 bg-white w-[71px] h-[36px] border border-[#d9d9d9] text-[12px] text-[#444847] pl-2.5"
      >
        <option value="title">제목</option>
        <option value="author">작성자</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-[193px] h-[36px] border border-[#d9d9d9] border-r-transparent"
      />

      <button
        onClick={handleSearch}
        className="w-[43px] h-[36px] bg-[#FFCD00] flex justify-center items-center"
      >
        <Image src={SearchImg} alt="검색" />
      </button>
    </div>
  )
}

export default Search
