import React from 'react'

import { SearchBox } from "react-instantsearch-dom"

const Search = ({ isOpen }) => (
    <div className={`search search--site-header ${isOpen ? 'search--is-open' : ''}`}>
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

export default Search
