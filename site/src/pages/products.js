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
"ais-RefinementList ais-Stats ais-SortBy ais-HitsPerPage"
"ais-RefinementList ais-Hits ais-Hits ais-Hits"
"ais-RefinementList ais-Hits ais-Hits ais-Hits"
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
  gridArea: "ais-RefinementList",
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
              <SearchBox />
            </div>
            <div style={sortByGrid}>
              <SortBy
                defaultRefinement="static-ecommerce-poc"
                items={[
                  { value: "static-ecommerce-poc", label: "Most relevant" },
                  {
                    value: "static-ecommerce-poc-price-asc",
                    label: "Price asc",
                  },
                  {
                    value: "static-ecommerce-poc-price-desc",
                    label: "Price desc",
                  },
                ]}
              />
            </div>
            <div style={hitsPerPageGrid}>
              <HitsPerPage
                defaultRefinement={5}
                items={[
                  { value: 1, label: "Show 1 hit" },
                  { value: 5, label: "Show 5 hits" },
                  { value: 10, label: "Show 10 hits" },
                ]}
              />
            </div>

            <div style={refinementListGrid}>
              <RefinementList
                container="#filters"
                attribute="categories.title"
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
    </Layout>
  )
}

export default ProductsPage
