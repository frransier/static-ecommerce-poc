import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"
import { motion } from "framer-motion"

const ProductCard = ({ hit }) => {
  return (
    <motion.div initial={{ y: 50, scale: 0.8 }} animate={{ y: 0, scale: 1 }}>
      <Link to={hit.slug ? `/products/${hit.slug.current}` : "/"}>
        <article key={hit.id} className="product-card">
          <div className="product-card__image-container">
            <img
              src={hit.asset.fixed.src}
              alt={hit.title}
              className="product-card__image"
            />
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
        </article>
      </Link>
    </motion.div>
  )
}

export default ProductCard
