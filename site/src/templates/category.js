import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { mapEdgesToNodes } from "../helpers/helpers"

export const query = graphql`
  query CategoryQuery($id: String!) {
    category: sanityCategory(id: {eq: $id}) {
      title
      description
    }
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
  const category = data && data.category
  const products = data && data.products
  const productNodes = mapEdgesToNodes(products)

  return (
    <Layout>
      <SEO title={category.title} />
      <h1>{category.title}</h1>
      <div>
        {category.description}
      </div>
      <div>
        Antal produkter: {products.totalCount}
        <ul>
          {productNodes.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.slug.current}`}>
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
