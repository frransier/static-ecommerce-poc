import React, { useContext } from "react"
import { LayoutContext } from "../context/LayoutStore"

import { SearchBox } from "react-instantsearch-dom"

const Search = () => {
  const [state] = useContext(LayoutContext)

  return (
    <div
      className={`search search--site-header ${
        state.searchIsOpen ? "search--is-open" : ""
      }`}
    >
      <div className="search__inner">
        <div className="search__field-container">
          <SearchBox
            autofocused
            translations={{ placeholder: "Search products..." }}
          />
        </div>
      </div>
    </div>
  )
}
export default Search
