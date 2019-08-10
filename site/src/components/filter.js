import React from "react"

import Hits from "./hits"
import Sort from "./sort"
import HitsPerPage from "./hitsPerPage"
import SelectedFilters from "./selectedFilters"

const Filter = () => {
  return (
    <div className="product-filter">
      <div className="product-filter__inner">
        <div className="product-filter__options-wrapper"></div>
        <div className="product-filter__active-options">
          <SelectedFilters />
        </div>
        <div className="product-filter__sort-wrapper">
          <Sort
            defaultRefinement="static-ecommerce-poc"
            items={[
              { value: "static-ecommerce-poc", label: "Mest relevant" },
              {
                value: "static-ecommerce-poc-price-asc",
                label: "Pris stigande",
              },
              {
                value: "static-ecommerce-poc-price-desc",
                label: "Pris fallande",
              },
            ]}
          />
          <HitsPerPage
            defaultRefinement={20}
            items={[
              { value: 20, label: "Visa 20 träffar" },
              { value: 40, label: "Visa 40 träffar" },
              { value: 100, label: "Visa 100 träffar" },
            ]}
          />
          <Hits />
        </div>
      </div>
    </div>
  )
}

export default Filter
