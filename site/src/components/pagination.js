import React from "react"

import { connectPagination } from "react-instantsearch-dom"

const Pagination = ({ currentRefinement, nbPages, refine }) => {
  return (
    <ul className="pagination">
      <li className="pagination__item">
        <a
          href="#"
          className="pagination__item-link pagination__item-link--navigation"
          onClick={() => refine(currentRefinement - 1)}
        >
          Previous
        </a>
      </li>
      {new Array(nbPages).fill(null).map((_, index) => (
        <li className="pagination__item" key={index}>
          <a
            href="#"
            className={`pagination__item-link${
              currentRefinement === index + 1
                ? " pagination__item-link--active"
                : ""
            }`}
            onClick={event => {
              event.preventDefault()
              refine(index + 1)
            }}
          >
            {index + 1}
          </a>
        </li>
      ))}
      {/* <li className="pagination__item pagination__item--indicator">...</li> */}
      <li className="pagination__item pagination__item--spacer"></li>
      {/* <li className="pagination__item">
        <a
          href="#"
          className="pagination__item-link pagination__item-link--active"
        >
          32
        </a>
      </li> */}
      <li className="pagination__item">
        <a
          href="#"
          className="pagination__item-link pagination__item-link--navigation"
          onClick={() => refine(currentRefinement + 1)}
        >
          Next
        </a>
      </li>
    </ul>
  )
}

export default connectPagination(Pagination)
