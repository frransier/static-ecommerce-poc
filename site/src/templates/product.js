import React, { useState, useEffect } from "react"

import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import GetPrice from "../components/getPrice"

export const query = graphql`
  query ProductQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      _id
      title
      slug {
        current
      }
      defaultProductVariant {
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
  const id = data.product._id
  const [product, setProduct] = useState()

  const [price, setPrice] = useState()

  useEffect(() => {
    setProduct(data.product)
  }, [price])

  function callbackFunction(childData) {
    setPrice(childData)
  }

  return (
    <Layout>
      <GetPrice parentCallback={callbackFunction} queryVariable={id}></GetPrice>
      <Link to="/products/">Back to products</Link>
      {product && <SEO title={product.title} />}
      {product && (
        <div>
          <div>{product.title}</div>
          <Image fixed={product.defaultProductVariant.images[0].asset.fixed} />
          <button
            className="snipcart-add-item"
            data-item-id={product._id}
            data-item-price={price}
            data-item-image={product.defaultProductVariant.images[0].asset.url}
            data-item-name={product.title}
            data-item-url={`http://static-ecommerce-poc.netlify.com/products/${product.slug.current}/`}
          >
            Buy now for kronor {price}
          </button>
        </div>
      )}
    </Layout>
  )
}

export default ProductTemplate
