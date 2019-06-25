import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"

import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"

import ProductPreview from "../components/productPreview"

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_KEY
)

export const query = graphql`
  {
    products: allSanityProduct {
      edges {
        node {
          id
          title
          categories {
            slug {
              current
            }
            title
          }
          slug {
            current
          }
          defaultProductVariant {
            price
            images {
              asset {
                fixed(height: 70, width: 70) {
                  ...GatsbySanityImageFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

const ProductsPage = () => {
  return (
    <Layout>
      <SEO title="Products" />
      <Link to="/">Back</Link>

      <InstantSearch
        searchClient={searchClient}
        indexName="static-ecommerce-poc"
      >
        <SearchBox />
        <Hits hitComponent={ProductPreview} />
      </InstantSearch>
    </Layout>
  )
}

export default ProductsPage
