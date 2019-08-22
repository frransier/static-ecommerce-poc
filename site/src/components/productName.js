import React from "react"
// import { motion } from "framer-motion"

const ProductName = props => {
  const HeadingElement = props.headingLevel ? `h${props.headingLevel}` : "h1"

  return (
    <div
      className={`product-name ${props.isBreak ? "product-name--break" : null}`}
    >
      {props.brand && (
        <span className="product-name__brand">
          {props.brandUrl ? (
            <a
              href={props.brandUrl}
              name="brand"
              class="product-name__brand-link"
            >
              {props.brand}
            </a>
          ) : (
            props.brand
          )}
        </span>
      )}

      <HeadingElement
        className={`product-name__name ${
          props.isHeadingInheritSize ? "product-name__name--inherit-size" : null
        }`}
      >
        {props.url ? (
          <a href={props.url} name="name" className="product-name__link">
            {props.name}
          </a>
        ) : (
          props.name
        )}
      </HeadingElement>
    </div>
  )
}

export default ProductName
