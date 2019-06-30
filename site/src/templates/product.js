import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Inventory from "../components/inventory"
import { graphql } from "gatsby"

export const query = graphql`
  query ProductQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      _id
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
      <AniLink fade to="/products/" duration={0.3}>
        Back to products
      </AniLink>
      {product && <SEO title={product.title} />}

      {product && (
        <div>
          <div>{product.title}</div>
          <Image fixed={product.defaultProductVariant.images[0].asset.fixed} />
          <Inventory id={product._id} />
          <button
            className="snipcart-add-item"
            data-item-id={product._id}
            data-item-price={product.defaultProductVariant.price}
            data-item-image={product.defaultProductVariant.images[0].asset.url}
            data-item-name={product.title}
            data-item-url={`http://static-ecommerce-poc.netlify.com/products/${product.slug.current}/`}
          >
            Buy now for {product.defaultProductVariant.price} kronor
          </button>
        </div>
      )}
    </Layout>
  )
}

export default ProductTemplate
