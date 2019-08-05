import React, { useEffect, useState } from "react"
// import algoliacss from "../styles/algolia.min.css"

import SEO from "../components/seo"
import Layout from "../components/layout"

import { Pagination } from "react-instantsearch-dom"
import ProductList from "../components/productList"
import Filter from "../components/filter"

const ProductsPage = () => {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])

  return (
    <Layout menuIsVisible={true}>
      <SEO title="Products" />
      {didMount ? (
        <>
          <section className="section section--no-bottom-padding">
            <Filter />
          </section>
          <section className="section section--no-padding-xs">
            {/* <div style={hitsGrid}>
              <Hits hitComponent={ProductPreview} />
            </div> */}
            <ProductList />
          </section>
          <section className="section section--padding-bottom-lg">
            META CARDS GOES HERE
          </section>
          <section className="section section--padding-bottom-lg">
            <Pagination showLast></Pagination>
          </section>
        </>
      ) : null}
    </Layout>
  )
}

export default ProductsPage
