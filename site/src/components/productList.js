import React from "react"

import { connectHits } from "react-instantsearch-dom"

import ProductCard from "./productCard"

const ProductList = ({ hits }) => {
  return (
    <section className="section section--no-padding-xs">
      <div className="grid grid--no-gutter-xs grid--col-xs-2 grid--col-sm-3 grid--col-md-4 grid--col-lg-4 grid--col-xl-4">
        {hits.map(hit => (
          <div className="grid__item" key={hit.objectID}>
            <ProductCard hit={hit} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default connectHits(ProductList)
