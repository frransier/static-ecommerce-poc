import React, { useEffect, useState } from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink" // eslint-disable-next-line
import algoliacss from "../styles/algolia.min.css"

import SEO from "../components/seo"
import Layout from "../components/layout"

import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  SortBy,
  Pagination,
  RefinementList,
  HitsPerPage,
  HierarchicalMenu,
} from "react-instantsearch-dom"
import ProductPreview from "../components/productPreview"

const searchClient = algoliasearch(
  "8EDH67ODRS",
  "3a599a08fde10c670966018cd5db6b2a"
)
var divStyle = {
  display: "grid",
  width: "100%",
  height: "auto",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gridTemplateRows: "30px 30px 1fr 1fr 50px",
  gridGap: "1rem",
  gridTemplateAreas: `
"ais-SearchBox ais-SearchBox ais-SearchBox ais-SearchBox"
"ais-HierarchicalMenu ais-Stats ais-SortBy ais-HitsPerPage"
"ais-HierarchicalMenu ais-Hits ais-Hits ais-Hits"
"ais-HierarchicalMenu ais-Hits ais-Hits ais-Hits"
"ais-Pagination ais-Pagination ais-Pagination ais-Pagination"`,
}

var searchBoxGrid = {
  gridArea: "ais-SearchBox",
}
var sortByGrid = {
  gridArea: "ais-SortBy",
}
var hitsPerPageGrid = {
  gridArea: "ais-HitsPerPage",
}
var refinementListGrid = {
  gridArea: "ais-HierarchicalMenu",
}
var hitsGrid = {
  gridArea: "ais-Hits",
}
var statsGrid = {
  gridArea: "ais-Stats",
}
var paginationGrid = {
  gridArea: "ais-Pagination",
}

const ProductsPage = () => {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])

  return (
    <Layout>
      <section className="section">
        <SEO title="Products" />
        <AniLink fade to="/" duration={0.3}>
          Back
        </AniLink>
        {didMount ? (
          <InstantSearch
            searchClient={searchClient}
            indexName="static-ecommerce-poc"
          >
            <div style={divStyle}>
              <div style={searchBoxGrid}>
                <SearchBox
                  autofocused
                  translations={{ placeholder: "Search products..." }}
                />
              </div>
              <div style={sortByGrid}>
                <SortBy
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
              </div>
              <div style={hitsPerPageGrid}>
                <HitsPerPage
                  defaultRefinement={18}
                  items={[
                    { value: 20, label: "Show 20 hits" },
                    { value: 40, label: "Show 40 hits" },
                    { value: 100, label: "Show 100 hits" },
                  ]}
                />
              </div>
              <div style={refinementListGrid}>
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
              <div style={statsGrid}>
                <Stats />
              </div>
              <div style={hitsGrid}>
                <Hits hitComponent={ProductPreview} />
              </div>

              <div style={paginationGrid}>
                <Pagination showLast></Pagination>
              </div>
            </div>
          </InstantSearch>
        ) : null}
      </section>
    </Layout>
  )
}

export default ProductsPage
