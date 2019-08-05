import React from "react"

import { connectStats } from "react-instantsearch-dom"

const Hits = ({ nbHits }) => (
  <span className="product-filter__hits">{nbHits} produkter</span>
)

export default connectStats(Hits)
