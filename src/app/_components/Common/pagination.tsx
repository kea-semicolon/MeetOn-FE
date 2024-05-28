import React from 'react'

interface PaginationProps {
  postsPerPage: number
  totalPosts: number
  getCurrentPage: (pageNumber: number) => void
}

const PaginationWeb: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  getCurrentPage,
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div
          key={number}
          className="page-link"
          onClick={() => getCurrentPage(number)}
          role="button"
        >
          {number}
        </div>
      ))}
    </div>
  )
}

export default PaginationWeb
