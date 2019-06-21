import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

export const query = graphql`
  query ProductQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      id
      title
      defaultProductVariant {
        price
        images {
          asset {
            fixed {
              ...GatsbySanityImageFixed
            }
          }
        }
      }
    }
  }
`

const ProductTemplate = props => {
  const { data } = props
  const product = data && data.product

  return (
    <Layout>
      {product && <SEO title={product.title} />}
      {product && (
        <div>
          <div>{product.title}</div>
          <div>{product.defaultProductVariant.price} kr</div>
          <Image fixed={product.defaultProductVariant.images[0].asset.fixed} />
        </div>
      )}
    </Layout>
  )
}

export default ProductTemplate
