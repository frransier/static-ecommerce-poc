import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

export const query = graphql`
  query ProductsQuery($id: String!) {
    products: allSanityProduct(filter: {categories: {elemMatch: {id: {eq: $id}}}}) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          categories {
            title
            id
          }
        }
      }
      totalCount
    }
  }
`

const CategoryTemplate = props => {
  const { data } = props
  const products = data && data.products

  return (
    <Layout>
      <p>{JSON.stringify(products)}</p>
    </Layout>
  )
}

export default CategoryTemplate
