import React, { useState } from "react"
import { connectSortBy } from "react-instantsearch-dom"

const Sort = ({ items, refine, createURL }) => {
  const [sortValue, setSortValue] = useState()

  const handleChange = event => {
    event.preventDefault()
    setSortValue(event.target.value)
    refine(event.target.value)
    createURL(event.target.value)
  }

  return (
    <select
      className="input input--select input--inline"
      value={sortValue}
      onChange={handleChange}
    >
      {items.map((item, index) => {
        return (
          <option className="input__option" value={item.value} key={index}>
            {item.label}
          </option>
        )
      })}
    </select>
  )
}

export default connectSortBy(Sort)
