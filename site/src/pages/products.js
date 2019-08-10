import React, { useEffect, useState } from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Pagination from "../components/pagination"
import ProductList from "../components/productList"
import Search from "../components/search"
import Filter from "../components/filter"

const ProductsPage = () => {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])

  return (
    <Layout menuIsVisible>
      <SEO title="Products" />
      {didMount ? (
        <>
          <section className="section">
            <Search />
          </section>
          <section className="section section--no-bottom-padding">
            <Filter />
          </section>
          <section className="section section--no-padding-xs">
            <ProductList />
          </section>
          <section className="section section--padding-bottom-lg">
            META CARDS GOES HERE
          </section>
          <section className="section section--padding-bottom-lg">
            <Pagination />
          </section>
        </>
      ) : null}
    </Layout>
  )
}

export default ProductsPage
