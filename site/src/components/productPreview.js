import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { Highlight } from "react-instantsearch-dom"
import { motion } from "framer-motion"

const ProductPreview = ({ hit }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
    >
      <AniLink fade to={`/products/${hit.slug.current}`} duration={0.3}>
      <div key={hit.id}>
        <div>
          <img src={hit.images[0].asset.fixed.src} alt={hit.title} />
          <br />
          <Highlight hit={hit} attribute="title" tagName="mark" />
          <br />
          <div>
            Categories:
            {hit.categories.map((category, index) => (
              <div key={category.title}>
                <div>
                  <AniLink
                    fade
                    to={`/${category.slug.current}/`}
                    duration={0.3}
                  >
                    <Highlight
                      hit={hit}
                      attribute={`categories[${index}].title`}
                      tagName="mark"
                    />
                  </AniLink>
                </div>
              </div>
            ))}
          </div>
          <div className="product-card__name">
            <div className="product-name product-name--break">
              <h3 className="product-name__name product-name__name--inherit-size">
                <Highlight hit={hit} attribute="title" tagName="mark" />
              </h3>
            </div>
          </div>
        <div className="product-card__footer">
          <div className="product-price">
            <span className="product-price__regular">{hit.price}:-</span>
          </div>
        </div>
        <div className="product-card__tags product-card__tags--top-left">
          <span className="tag tag--no-padding">
            <img alt="sale" src="/assets/icons/sale.svg" />
          </span>
        </div>
        <div className="product-card__tags product-card__tags--top-right">
          <span className="tag tag--no-padding">
            <img alt="variants" src="/assets/icons/variants.svg" />
          </span>
        </div>
        <br />
      </div>
      </div>
      </AniLink>
    </motion.div>
  )
}

export default ProductPreview
