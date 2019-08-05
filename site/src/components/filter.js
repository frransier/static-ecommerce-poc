import React from "react"

import Hits from "./hits"
import Sort from "./sort"

const Filter = () => {
  return (
    <div className="product-filter">
      <div className="product-filter__inner">
        <div className="product-filter__options-wrapper"></div>
        <div className="product-filter__active-options"></div>
        <div className="product-filter__sort-wrapper">
          <Sort
            defaultRefinement="static-ecommerce-poc"
            items={[
              { value: "static-ecommerce-poc", label: "Most relevant" },
              {
                value: "static-ecommerce-poc-price-asc",
                label: "Price ascending",
              },
              {
                value: "static-ecommerce-poc-price-desc",
                label: "Price descending",
              },
            ]}
          />
          {/* <HitsPerPage
            defaultRefinement={18}
            items={[
              { value: 20, label: "Show 20 hits" },
              { value: 40, label: "Show 40 hits" },
              { value: 100, label: "Show 100 hits" },
            ]}
          /> */}
          <Hits />
        </div>
      </div>
    </div>
  )
}

export default Filter
