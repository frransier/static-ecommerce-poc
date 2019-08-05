import React from "react"

import { HierarchicalMenu, RefinementList } from "react-instantsearch-dom"

const Menu = () => (
  <div>
    <HierarchicalMenu
      attributes={["categories.lvl0", "categories.lvl1"]}
      limit={100}
    />
    <RefinementList
      attribute="categories.title"
      showMore
      showMoreLimit={30}
      searchable
      translations={{
        placeholder: "Search categories...",
      }}
    />
  </div>
)

export default Menu
