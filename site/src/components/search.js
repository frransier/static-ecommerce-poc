import React, { useContext, useEffect, createRef } from "react"
import { LayoutContext } from "../context/LayoutStore"

import { connectSearchBox } from "react-instantsearch-dom"
import SearchResult from "./searchResult"

const Search = ({
  refine,
  currentRefinement,
  showResults,
  isInSiteHeader,
  autoFocus,
}) => {
  const [state] = useContext(LayoutContext)

  // Focus the input element when it's shown
  const inputRef = createRef()
  useEffect(() => {
    if (state.searchIsOpen && autoFocus) inputRef.current.focus()
  })

  const handleSearch = event => {
    refine(event.currentTarget.value)
  }

  return (
    <div
      className={`search 
            ${state.searchIsOpen || !isInSiteHeader ? "search--is-open" : ""}
            ${isInSiteHeader ? "search--site-header" : ""}
        `}
    >
      <div className="search__inner">
        <div className="search__field-container">
          <input
            ref={inputRef}
            type="search"
            className="input search__field-input"
            name="searchfield"
            placeholder="Sökord"
            tabIndex="-1"
            value={currentRefinement}
            onChange={handleSearch}
          />
          <button
            className="button button--red search__button"
            tabIndex="-1"
            type="button"
          >
            Sök
          </button>
        </div>
        {showResults && currentRefinement && (
          <div className="search__result-container search__result-container--is-expanded">
            <SearchResult />
            <a
              className="button button--is-link button--red button--text-center button-icon"
              href="/products"
              tabIndex="-1"
            >
              <svg
                className="icon icon--xs button-icon__icon"
                aria-hidden="true"
              >
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref="../../content/assets/icons/icon-sprite.svg#double-chevron"
                ></use>
              </svg>
              <span className="hide-visually">SR only text</span>

              <span className="button-icon__text">Visa sökresultat</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
export default connectSearchBox(Search)
