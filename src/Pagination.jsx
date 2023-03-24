import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex flex-row space-x-2">
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber}>
          <a
            href="#"
            
            onClick={() => onPageChange(pageNumber)}
            className={`p-2 bg-gray-300 rounded mt-2 ${currentPage === pageNumber ? "active" : null}`}
          >
            {pageNumber}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination