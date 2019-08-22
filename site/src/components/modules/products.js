import React from "react"
import ProductCard from "../productCard"

function Products({ hits }) {
  console.log(hits)

  return (
    <section className="section section--no-padding-xs">
      <div className="grid grid--equal-row-height grid--no-gutter-xs grid--col-xs-2 grid--col-sm-3 grid--col-md-4 grid--col-lg-4 grid--col-xl-4">
        {hits.products.map((hit, index) => (
          <div className="grid__item" key={index}>
            <ProductCard hit={hit} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products
