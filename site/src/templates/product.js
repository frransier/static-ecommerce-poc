import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Attributes from "../components/attributes"
const flex = {
  display: "flex",
}
const regular = {
  display: "flex-box",
}

const ProductTemplate = props => {
  const state = false
  const { data } = props
  const product = data && data.product

  return (
    <Layout>
      <pre>{JSON.stringify(product, null, 2)}</pre>
      <section className="section">
        <AniLink fade to="/products/" duration={0.3}>
          Back to products
        </AniLink>
        {product && <SEO title={product.title} />}

        {product && (
          <div>
            <h1>{state ? state.title : product.title}</h1>
            <div style={flex}>
              <div>
                <Image
                  fixed={
                    state ? state.mainImage : product.mainImage.asset.fixed
                  }
                />
              </div>
              <div style={regular}>
                <div>{product.body}</div>
                <div>
                  {product.variants.map((variant, index) => (
                    <div key={index}>
                      <strong>{variant.title}</strong>
                      <br></br>
                      {variant.attributes.map(a => (
                        <Attributes key={a._key} type={a._type} attribute={a} />
                      ))}
                    </div>
                  ))}
                </div>
                <br></br>
              </div>
            </div>
            <div>{product.intro}</div>
            <div>
              {product.images.map((img, index) => (
                <Image key={index} fixed={img.asset.fixed} />
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default ProductTemplate

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
      variants {
        articleNumber
        title
        standard
        discount
        clubJaktia
        attributes {
          ... on SanityThread {
            thread
            _type
            _key
          }
          ... on SanityStance {
            stance
            _type
            _key
          }
          ... on SanitySizeShoes {
            sizeShoes
            _key
            _type
          }
          ... on SanitySizePants {
            sizePants
            _type
            _key
          }
          ... on SanitySizeOther {
            sizeOther
            _type
            _key
          }
          ... on SanitySizeHats {
            sizeHats
            _type
            _key
          }
          ... on SanitySizeGloves {
            sizeGloves
            _type
            _key
          }
          ... on SanitySizeClothes {
            sizeClothes
            _type
            _key
          }
          ... on SanityExperience {
            experience
            _type
            _key
          }
          ... on SanityColor {
            color
            image {
              asset {
                fixed {
                  ...GatsbySanityImageFixed
                }
              }
            }
            _type
          }
          ... on SanityCaliber {
            caliber
            _type
          }
          ... on SanityBarrelLength {
            barrelLength
            _type
          }
        }
      }
      productNumber
    }
  }
`
