import React, { useEffect, useState } from 'react'

const generatePagination = (currentPage, totalPages) => {
  const visiblePages = 3
  const result = []

  // Asegurarse de que currentPage esté en los límites
  currentPage = currentPage < 1 ? 1 : currentPage
  currentPage = currentPage > totalPages ? totalPages : currentPage

  if (totalPages <= 4) {
    // Si hay 4 o menos páginas, mostrar todas
    for (let i = 1; i <= totalPages; i++) {
      result.push(i)
    }
  } else {
    if (currentPage <= visiblePages) {
      for (let i = 1; i <= visiblePages; i++) {
        result.push(i)
      }
      if (currentPage === visiblePages) result.push(visiblePages + 1)
      if (currentPage < visiblePages || currentPage + 3 <= totalPages)
        result.push('...')
      result.push(totalPages)
    } else {
      result.push(1)
      result.push('...')
      let inicial = currentPage - 1
      let final = currentPage + 1
      let siFinal = false
      if (currentPage === totalPages) {
        inicial--
        final = totalPages
        siFinal = true
      }
      if (currentPage === totalPages - 1) final--
      for (let i = inicial; i <= final; i++) {
        result.push(i)
      }
      if (currentPage + 3 <= totalPages) result.push('...')
      if (!siFinal) result.push(totalPages)
    }
  }

  return result
}

function PaginationNumeric({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  nextPage,
  prevPage,
  handlePage,
}) {
  const [pagination, setPagination] = useState([])

  useEffect(() => {
    setPagination(generatePagination(currentPage, totalPages))
  }, [currentPage, totalPages])

  return (
    <div className='flex justify-center'>
      <nav className='flex' role='navigation' aria-label='Navigation'>
        <div className='mr-2'>
          <span
            className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 ${
              hasPrevPage
                ? 'hover:bg-indigo-500 text-slate-600 hover:text-white shadow-sm cursor-pointer'
                : 'text-slate-300 cursor-not-allowed'
            }`}
            onClick={e => {
              e.preventDefault()
              handlePage(prevPage)
            }}>
            <span className='sr-only'>Previous</span>
            <wbr />
            <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
              <path d='M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z' />
            </svg>
          </span>
        </div>
        <ul className='inline-flex text-sm font-medium -space-x-px shadow-sm'>
          {pagination.map((el, i) => (
            <li key={el + i}>
              <span
                className={`inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white border border-slate-200 ${
                  el === 1 && 'rounded-l'
                } ${el === totalPages && 'rounded-r'} ${
                  el === currentPage
                    ? 'text-indigo-500 font-bold'
                    : el !== '...'
                    ? 'hover:bg-indigo-500 text-slate-600 hover:text-white cursor-pointer'
                    : 'text-slate-600'
                }`}
                onClick={e => {
                  e.preventDefault()
                  handlePage(el)
                }}>
                {el}
              </span>
            </li>
          ))}
        </ul>
        <div className='ml-2'>
          <span
            className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 ${
              hasNextPage
                ? 'hover:bg-indigo-500 text-slate-600 hover:text-white shadow-sm cursor-pointer'
                : 'text-slate-300 cursor-not-allowed'
            }`}
            onClick={e => {
              e.preventDefault()
              handlePage(nextPage)
            }}>
            <span className='sr-only'>Next</span>
            <wbr />
            <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
              <path d='M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z' />
            </svg>
          </span>
        </div>
      </nav>
    </div>
  )
}

export default PaginationNumeric
