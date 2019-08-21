import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { mapEdgesToNodes } from "../helpers/helpers"

export const query = graphql`
  query CategoryQuery($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      title
      description
    }
    products: allSanityProduct(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
    ) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          categories {
            title
            _id
          }
        }
      }
      totalCount
    }
  }
`

const CategoryTemplate = props => {
  const { data } = props
  const category = data && data.category
  const products = data && data.products

  const productNodes = mapEdgesToNodes(products)

  return (
    <Layout>
      <SEO title={category.title} />
      <Link to="/">Back</Link>
      <h1>{category.title}</h1>
      <div>{category.description}</div>
      <div>
        Number of products in category: {products.totalCount}
        <ul>
          {productNodes.map(product => (
            <li key={product.id}>
              <Link
                to={product.slug ? `/products/${product.slug.current}` : `/`}
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default CategoryTemplate
