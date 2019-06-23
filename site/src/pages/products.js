import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { mapEdgesToNodes } from "../helpers/helpers"

export const query = graphql`
  {
    products: allSanityProduct {
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
const ProductsPage = props => {
  const { data } = props

  const productNodes = mapEdgesToNodes(data.products)

  return (
    <Layout>
      <SEO title="Products" />
      <Link to="/">Back</Link>
      {productNodes.map(product => (
        <div key={product.id}>
          <div>
            <Image
              fixed={product.defaultProductVariant.images[0].asset.fixed}
            />
            <br />
            <Link to={`/products/${product.slug.current}`}>
              {product.title}
            </Link>
            <br />
            <div>
              {product.categories.map(cat => (
                <div key={cat.title}>{cat.title}</div>
              ))}
            </div>
            <p>Price: {product.defaultProductVariant.price} kr</p>
          </div>
          <br />
        </div>
      ))}
    </Layout>
  )
}

export default ProductsPage
