import React, { useReducer, useContext } from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import productReducer from "../context/productReducer"
// import ProductImages from "../components/productImages"
import ProductName from "../components/productName"
import ProductPrice from "../components/productPrice"
import { CartContext } from "../context/LayoutStore"
import { motion } from "framer-motion"

const flex = {
  display: "flex",
}

const ProductTemplate = props => {
  const { data } = props
  const product = data && data.product
  const initialState = {
    mainImage: product.mainImage.asset.fixed,
    title: product.title,
    articleNo: product.variants[0].articleNumber,
    standard: product.variants[0].standard,
    jaktia: product.variants[0].clubJaktia,
    discount: product.variants[0].discount,
    attributes: product.variants[0].attributes,
  }
  const getCartItem = item => {
    const foundIndex = cartState.findIndex(x => x.articleNo === item.articleNo)
    return {
      name: state.title,
      articleNo: state.articleNo,
      price: Math.max(state.standard, state.jaktia, state.discount),
      thumbnail: product.thumbnails[0].asset.fixed,
      quantity: foundIndex > -1 ? cartState[foundIndex].quantity : 1,
    }
  }
  const [state, productDispatch] = useReducer(productReducer, initialState)
  const [cartState, dispatch] = useContext(CartContext)
  const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  return (
    <Layout>
      <SEO title={product.title} />
      <div className="product-detail">
        {/* {{render '@lightbox' lightboxContext merge=true~}} */}
        <section className="section">
          <Link to="/products/">Back to products</Link>
          <div className="grid grid--col-xs-1 grid--col-sm-1">
            <div className="grid__item grid__item--7">
              {/* {{render '@product-images'}} */}
              <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
                <Image fixed={state.mainImage} />
              </motion.div>
              <motion.div
                initial={{ opcaity: 0, x: 80 }}
                animate={{ opcaity: 1, x: 80 }}
              >
                <div style={flex}>
                  {product.thumbnails.map((image, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        productDispatch({
                          type: "set-mainImage",
                          image: product.images[index],
                        })
                      }
                    >
                      {" "}
                      <Image fixed={image.asset.fixed} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="grid__item grid__item--5">
              <motion.div
                initial={{ opcaity: 0 }}
                animate={{ opcaity: 1 }}
                transition={{
                  delay: 0.7,
                }}
              >
                <header className="product-detail__header">
                  <div className="product-detail__name">
                    <ProductName
                      name={state.title}
                      brand={product.vendor.title}
                    />
                  </div>
                  <div className="product-detail__tags">
                    {/* {{> '@tag' modifier='red' text='Proffs' hoverText='Proffs' isBordered=true}} */}
                    {/* {{> '@tag' modifier='blue' text='Fiske' hoverText='Fiske' isBordered=true}} */}
                  </div>
                </header>
              </motion.div>
              {product.intro && (
                <main className="product-detail__short-description">
                  {product.intro}
                  <br />
                  <br />
                  Variants:
                  {product.variants.map((variant, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        productDispatch({
                          type: "set-variant",
                          variant: variant,
                        })
                      }
                    >
                      {variant.title}
                    </li>
                  ))}
                  <br />
                  <button
                    onClick={() =>
                      productDispatch({
                        type: "reset-variant",
                        initialState: initialState,
                      })
                    }
                  >
                    Standard variant
                  </button>
                  {product.body && (
                    <div>
                      <br />
                      <a
                        href="#long-description"
                        name="read more"
                        className="product-detail__read-more"
                      >
                        LÄS MER
                      </a>
                    </div>
                  )}
                  <br></br>
                </main>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.25,
                }}
              >
                <div className="product-detail__price">
                  <div className="product-detail__price-left">
                    <ProductPrice
                      isBig={true}
                      regularPrice={state.standard}
                      discountedPrice={state.discount}
                    />
                  </div>
                  <div className="product-detail__price-right">
                    <ProductPrice isBig={true} clubPrice={state.jaktia} />
                  </div>
                </div>
              </motion.div>

              {/* {{render '@button-icon' buttons.buyButton merge=true}} */}
              <div className="product-detail__stock-status">
                {/* {{render '@stock-status'}} */}
              </div>
              <motion.div
                initial={{ opcaity: 0, scale: 0 }}
                animate={{ opcaity: 1, scale: 1 }}
                transition={{
                  delay: 0.5,
                }}
              >
                <button
                  className="button button--is-link button--red button--full-width button--text-center button-icon"
                  onClick={() =>
                    dispatch({ type: "add-item", item: getCartItem(state) })
                  }
                >
                  add to cart
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section section--full section--no-padding section--grey">
          <section className="section">
            <div className="grid grid--col-xs-1 grid--col-sm-1">
              <div className="grid__item grid__item--7 product-detail__grid-item">
                <h2 className="product-detail__heading">Beskrivning</h2>
                <div className="wysiwyg-content">
                  {product.body && (
                    <>
                      {/* eslint-disable */}
                      <a
                        name="body"
                        id="long-description"
                        className="product-detail__anchor"
                      ></a>
                      {/* eslint-enable */}
                      {product.body}
                    </>
                  )}
                </div>
                <h2 className="product-detail__heading">Om varumärket</h2>
                <div className="wysiwyg-content">
                  <p>{product.vendor.title}</p>
                </div>
                {/* {{render '@brand-item' brandItemContext merge=true}} */}
              </div>
              <div className="grid__item grid__item--5">
                <h2 className="product-detail__heading">Specifikation</h2>
                <dl className="desc-list">
                  <dt className="desc-list__dt">Artikelnummer:</dt>
                  <dd className="desc-list__dd">{state.articleNo}</dd>
                  <dt className="desc-list__dt">Varumärke:</dt>
                  <dd className="desc-list__dd">
                    {/* eslint-disable-next-line */}
                    <a href="#" name="brand title">
                      {product.vendor.title}
                    </a>
                  </dd>
                  <dt className="desc-list__dt">Kategori:</dt>
                  <dd className="desc-list__dd">
                    {/* eslint-disable-next-line */}
                    <a href="#" name="category">
                      {product.categories[0].title}
                    </a>
                  </dd>
                  <dt className="desc-list__dt">Typ:</dt>
                  <dd className="desc-list__dd">
                    {/* eslint-disable-next-line */}
                    <a href="#" name="sub category">
                      {product.categories[1].title}
                    </a>
                  </dd>
                  {state.attributes &&
                    state.attributes.map(a => {
                      return (
                        <>
                          <dt className="desc-list__dt">
                            {capitalize(a._type)}:
                          </dt>
                          <dd className="desc-list__dd">{a.value}</dd>
                        </>
                      )
                    })}
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
      thumbnails: images {
        asset {
          fixed(height: 80, width: 60) {
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
            value
            _type
            _key
          }
          ... on SanityStance {
            value
            _type
            _key
          }
          ... on SanitySizeShoes {
            value
            _key
            _type
          }
          ... on SanitySizePants {
            value
            _type
            _key
          }
          ... on SanitySizeOther {
            value
            _type
            _key
          }
          ... on SanitySizeHats {
            value
            _type
            _key
          }
          ... on SanitySizeGloves {
            value
            _type
            _key
          }
          ... on SanitySizeClothes {
            value
            _type
            _key
          }
          ... on SanityExperience {
            value
            _type
            _key
          }
          ... on SanityColor {
            value
            image {
              asset {
                fixed(height: 400, width: 300) {
                  ...GatsbySanityImageFixed
                }
              }
            }
            _type
          }
          ... on SanityCaliber {
            value
            _type
          }
          ... on SanityBarrelLength {
            value
            _type
          }
        }
      }
      productNumber
      categories {
        title
      }
      vendor {
        title
      }
    }
  }
`
