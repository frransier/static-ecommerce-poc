import React from "react"
// import AniLink from "gatsby-plugin-transition-link/AniLink"
// import Image from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
// import Attributes from "../components/attributes"
// const flex = {
//   display: "flex",
// }
// const regular = {
//   display: "flex-box",
// }

import ProductName from "../components/productName"

const ProductTemplate = props => {
  // const state = false
  const { data } = props
  const product = data && data.product

  return (
    <Layout>
      {/* <pre>{JSON.stringify(product, null, 2)}</pre>
      <section className="section">
        <AniLink fade to="/products/" duration={0.6}>
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
      </section> */}



      {product && <SEO title={product.title} />}

      <div className="product-detail">
        {/* {{render '@lightbox' lightboxContext merge=true~}} */}
        <section className="section">
          <div className="grid grid--col-xs-1 grid--col-sm-1">
            <div className="grid__item grid__item--7">
              {/* {{render '@product-images'}} */}
            </div>
            <div className="grid__item grid__item--5">
              <header className="product-detail__header">
                  <div className="product-detail__name">
                    <ProductName name="Product name" brand="Brand name" />
                      {/* {{render '@product-name' productNameContext merge=true}} */}
                  </div>
                  <div className="product-detail__tags">
                      {/* {{> '@tag' modifier='red' text='Proffs' hoverText='Proffs' isBordered=true}} */}
                      {/* {{> '@tag' modifier='blue' text='Fiske' hoverText='Fiske' isBordered=true}} */}
                  </div>
              </header>
              <main className="product-detail__short-description">
                  Här skrivs ett utdrag av produkttexten ut. Vid klick på knappen i slutet skjuts kunden ner till fullständig beskrivning. <a href="#long-description" className="product-detail__read-more">LÄS MER</a>
              </main>
              <div className="product-detail__price">
                  <div className="product-detail__price-left">
                      {/* {{render '@product-price' productPriceContext.regular merge=true}} */}
                  </div>
                  <div className="product-detail__price-right">
                      {/* {{render '@product-price' productPriceContext.clubJaktia merge=true}} */}
                      <a className="h-text-underline h-color-grey-dark" href="#">Club Jaktia-pris</a>
                  </div>
              </div>
              <div className="product-detail__variant-select">
                  {/* {{render '@label' labelContext.select merge=true}} */}
                  {/* {{render '@input--select' selectContext merge=true}} */}
              </div>
              {/* {{render '@button-icon' buttons.buyButton merge=true}} */}
              <div className="product-detail__stock-status">
                  {/* {{render '@stock-status'}} */}
              </div>
              <div className="product-detail__locator">
                  {/* {{render '@button-icon' buttons.locateClosestStore merge=true~}} */}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--full section--no-padding section--grey">
          <section className="section">
            <div className="grid grid--col-xs-1 grid--col-sm-1">
              <div className="grid__item grid__item--7 product-detail__grid-item">
                <h2 className="product-detail__heading">Beskrivning</h2>
                  <div className="wysiwyg-content">
                    <a id="long-description" className="product-detail__anchor"></a>
                    long desc
                  </div>
                  <h2 className="product-detail__heading">Om varumärket</h2>
                  <div className="wysiwyg-content">
                    <p>brand info</p>
                  </div>
                  {/* {{render '@brand-item' brandItemContext merge=true}} */}
                </div>
                <div className="grid__item grid__item--5">
                  <h2 className="product-detail__heading">Specifikation</h2>
                  <dl className="desc-list">
                      <dt className="desc-list__dt">Artikelnummer:</dt>
                      <dd className="desc-list__dd">
                          ABCD-1234
                      </dd>
                      <dt className="desc-list__dt">Varumärke:</dt>
                      <dd className="desc-list__dd">
                          <a href="#">Jaktia Brand</a>
                      </dd>
                      <dt className="desc-list__dt">Kategori:</dt>
                      <dd className="desc-list__dd">
                          <a href="#">Vapen - Jakt</a>
                      </dd>
                      <dt className="desc-list__dt">Typ:</dt>
                      <dd className="desc-list__dd">
                          <a href="#">Hagelgevär</a>
                      </dd>
                      <dt className="desc-list__dt">Färg:</dt>
                      <dd className="desc-list__dd">
                          Svart
                      </dd>
                      <dt className="desc-list__dt">Kaliber:</dt>
                      <dd className="desc-list__dd">
                          12
                      </dd>
                  </dl>
                  {/* {{render '@share'}} */}
                </div>
            </div>
          </section>
        </section>
      </div>      
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
