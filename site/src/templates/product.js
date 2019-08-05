import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export const query = graphql`
  query ProductQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      _id
      title
      intro
      body
      slug {
        current
      }
      mainImage {
        asset {
          fixed {
            ...GatsbySanityImageFixed
          }
        }
      }
      images {
        asset {
          fixed {
            ...GatsbySanityImageFixed
          }
        }
      }
      attributes {
        ... on SanityBarrelLength {
          barrelLength
        }
        ... on SanityCaliber {
          caliber
        }
        ... on SanityThread {
          thread
        }
        ... on SanityStance {
          stance
        }
        ... on SanitySizeShoes {
          sizeShoes
        }
        ... on SanitySizePants {
          sizePants
        }
        ... on SanitySizeOther {
          sizeOther
        }
        ... on SanitySizeHats {
          sizeHats
        }
        ... on SanitySizeGloves {
          sizeGloves
        }
        ... on SanitySizeClothes {
          sizeClothes
        }
        ... on SanityExperience {
          experience
        }
        ... on SanityColor {
          color
        }
      }
    }
  }
`

const flex = {
  display: "flex",
}
const regular = {
  display: "flex-box",
}

const ProductTemplate = props => {
  const { data } = props
  const product = data && data.product

  return (
    <Layout>
      <section className="section">
        <AniLink fade to="/products/" duration={0.3}>
          Back to products
        </AniLink>
        {product && <SEO title={product.title} />}

        {product && (
          <div>
            <div>{product.title}</div>
            <div style={flex}>
              <div>
                <Image fixed={product.mainImage.asset.fixed} />
              </div>
              <div style={regular}>
                <div>{product.body}</div>
                <br></br>
                <div>
                  {product.attributes.map((a, index) => (
                    <div>A wild attribute appears: {a.color}</div>
                  ))}
                </div>
              </div>
            </div>
            <div>{product.intro}</div>
            <div>
              {product.images.map((img, index) => (
                <Image key={index} fixed={img.asset.fixed} />
              ))}
            </div>

            {/* SNIPCART BUY BUTTON
            <button
              className="snipcart-add-item"
              data-item-id={product._id}
              data-item-price={product.defaultProductVariant.price}
              data-item-image={
                product.defaultProductVariant.images[0].asset.url
              }
              data-item-name={product.title}
              data-item-url={`http://static-ecommerce-poc.netlify.com/products/${product.slug.current}/`}
            >
              Buy now for {product.defaultProductVariant.price} kronor
            </button> */}
          </div>
        )}
      </section>
    </Layout>
  )
}

export default ProductTemplate
