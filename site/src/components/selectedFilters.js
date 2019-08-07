import React from "react"

import { connectCurrentRefinements } from "react-instantsearch-dom"

const SelectedFilters = ({ items, refine }) => {
  return (
    <>
      {items.map((item, index) => (
        <button
          key={index}
          className="button button--transparent selected-filter-button"
          onClick={event => {
            event.preventDefault()
            refine(item.value)
          }}
        >
          <svg className="icon icon--xs" aria-hidden="true">
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref="/assets/icons/icon-sprite.svg#remove-red"
            ></use>
          </svg>
          <span className="hide-visually">SR only text</span>

          <span className="button-icon__text">{item.currentRefinement}</span>
        </button>
      ))}
    </>
  )
}

export default connectCurrentRefinements(SelectedFilters)
