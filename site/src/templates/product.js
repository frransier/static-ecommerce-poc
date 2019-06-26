import React, { useState } from "react"
import { useGraphQL } from "../utils/use-graphql"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"

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

  const product = data && data.product

  const [id] = useState(product._id)

  const { result, loading, error } = useGraphQL(
    "https://39k0k3q1.api.sanity.io/v1/graphql/production/default",
    `query 
        Product($id: ID!) {
            Product(id:$id){
                defaultProductVariant {
                    price
                }
            }
        }
      
    `,
    { id }
  )

  if (loading) {
    return <div>GETTING PRICE FROM SANITY</div>
  }
  if (error) {
    return <div>Error getting graphql data</div>
  }

  return (
    <Layout>
      <Link to="/products/">Back to products</Link>
      {product && <SEO title={product.title} />}
      {product && (
        <div>
          <div>{product.title}</div>

          <Image fixed={product.defaultProductVariant.images[0].asset.fixed} />

          <button
            className="snipcart-add-item"
            data-item-id={product._id}
            data-item-price={result.Product.defaultProductVariant.price}
            data-item-image={product.defaultProductVariant.images[0].asset.url}
            data-item-name={product.title}
            data-item-url={`http://static-ecommerce-poc.netlify.com/products/${product.slug.current}/`}
          >
            Buy now for kronor {result.Product.defaultProductVariant.price}
          </button>
        </div>
      )}
    </Layout>
  )
}

export default ProductTemplate
