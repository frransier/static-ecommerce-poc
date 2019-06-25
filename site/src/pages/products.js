import React from "react"
import { Link } from "gatsby"

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

const Sidebar = () => (
  <div>
    <h3>Filter by categories</h3>
    <RefinementList attribute="categories.title"></RefinementList>
  </div>
)

const ProductsPage = () => {
  return (
    <Layout>
      <SEO title="Products" />
      <Link to="/">Back</Link>

      <InstantSearch
        searchClient={searchClient}
        indexName="static-ecommerce-poc"
      >
        <aside>
          <Sidebar></Sidebar>
        </aside>
        <SortBy
          defaultRefinement="static-ecommerce-poc"
          items={[
            { value: "static-ecommerce-poc", label: "Most relevant" },
            { value: "static-ecommerce-poc-price-asc", label: "Price asc" },
            { value: "static-ecommerce-poc-price-desc", label: "Price desc" },
          ]}
        ></SortBy>
        <HitsPerPage
          defaultRefinement={5}
          items={[
            { value: 1, label: "Show 1 hit" },
            { value: 5, label: "Show 5 hits" },
            { value: 10, label: "Show 10 hits" },
          ]}
        />
        <SearchBox />
        <Stats />
        <Hits hitComponent={ProductPreview} />

        <Pagination showLast></Pagination>
      </InstantSearch>
    </Layout>
  )
}

export default ProductsPage
