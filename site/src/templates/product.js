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
      slug {
        current
      }
      defaultProductVariant {
        price
        images {
          asset {
            url
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
          <button
            className="snipcart-add-item"
            data-item-id={product.id}
            data-item-price={product.defaultProductVariant.price}
            data-item-image={product.defaultProductVariant.images[0].asset.url}
            data-item-name={product.title}
            data-item-url={`http://static-ecommerce-poc.netlify.com/products + /${product.slug.current}/`}
          >
            Buy now for {product.defaultProductVariant.price} kronor
          </button>

          <Image fixed={product.defaultProductVariant.images[0].asset.fixed} />
        </div>
      )}
    </Layout>
  )
}

export default ProductTemplate
