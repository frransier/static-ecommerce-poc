import React from "react"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import SEO from "../components/seo"
import Layout from "../components/layout"
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
  const category = data && data.category
  const products = data && data.products
  const productNodes = mapEdgesToNodes(products)

  return (
    <Layout>
      <SEO title={category.title} />
      <AniLink to="/" fade duration={0.5}>
        Back
      </AniLink>
      <h1>{category.title}</h1>
      <div>{category.description}</div>
      <div>
        Number of products in category: {products.totalCount}
        <ul>
          {productNodes.map(product => (
            <li key={product.id}>
              <AniLink
                fade
                to={`/products/${product.slug.current}`}
                duration={0.5}
              >
                {product.title}
              </AniLink>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default CategoryTemplate
