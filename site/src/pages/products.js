import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { mapEdgesToNodes } from "../helpers/helpers"

export const query = graphql`
  {
    products: allSanityProduct(filter: { slug: { current: { ne: null } } }) {
      edges {
        node {
          id
          title
          categories {
            title
          }
          slug {
            current
          }
        }
      }
    }
  }
`
const ProductsPage = props => {
  const { data } = props

  const productNodes = mapEdgesToNodes(data.products)

  return (
    <Layout>
      <SEO title="Products" />
      {productNodes.map(product => (
        <div>
          <Link to={`products/${product.slug.current}`}>{product.title}</Link>
          {product.categories.map(category => (
            <div>{category.title}</div>
          ))}
        </div>
      ))}
    </Layout>
  )
}

export default ProductsPage
