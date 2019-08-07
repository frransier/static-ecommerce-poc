import React from "react"

const ProductPrice = props => {
  const hasDicountPrice = props.discountedPrice || props.clubPrice

  return (
    <div className={`product-price ${props.isBig || props.dicountedPriceIsHighlighted ? "product-price--big" : null}`}>
      {/* <span class="product-price__prefix">Från:</span> */}
      {hasDicountPrice &&
        <strong className={`product-price__discounted ${props.clubPrice ? "product-price__discounted--club" : null}`}>
          { props.clubPrice ? props.clubPrice : props.discountedPrice }
        </strong>
      }
      {props.regularPrice &&
        <span className={`product-price__regular ${hasDicountPrice ? "product-price__regular--is-not-current" : null}`}>
          {hasDicountPrice ? `Ord. ${props.regularPrice}` : props.regularPrice}
        </span>
      }
    </div>
  )
}

export default ProductPrice
