import React, { useContext } from "react"
import { CartContext } from "../context/LayoutStore"

import Image from "gatsby-image"

const CartArticle = ({ item, index }) => {
  const [cartState, cartDispatch] = useContext(CartContext)

  return (
    <div className="cart-article">
      {/* <div className="overlay">
        <div className="dialog">
          <div className="dialog__text">
            Are you sure you want to delete this item?
          </div>
          <div className="dialog-buttons">
            <button className="button button--transparent button--underline dialog-buttons__button h-padding-xs">
              Remove
            </button>

            <button className="button button--transparent button--underline dialog-buttons__button h-padding-xs">
              Cancel
            </button>
          </div>
        </div>
      </div> */}

      <div className="cart-article__image-wrapper">
        {/* <img
          src="https://imgplaceholder.com/150x150/aaaaaa/ffffff/fa-image"
          alt=""
          className="cart-article__image"
        /> */}
        <Image fixed={item.thumbnail} />
      </div>
      <div className="cart-article__name-wrapper">
        <div className="product-name">
          <span className="product-name__brand">Yamaha</span>
          <h3 className="product-name__name">{item.name}</h3>
        </div>
      </div>
      <div className="product-price cart-article__price">
        <span className="product-price__regular">
          {item.price * cartState[index].quantity}
        </span>
      </div>
      <div className="cart-article__quantity-selector-wrapper">
        <div className="quantity-selector">
          <button
            className="button button--transparent h-padding-xxs quantity-selector__button"
            onClick={() => cartDispatch({ type: "remove-item", index: index })}
          >
            <svg className="icon quantity-selector__icon" aria-hidden="true">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="/assets/icons/icon-sprite.svg#minus-circle"
              ></use>
            </svg>
            <span className="hide-visually">SR only text</span>
          </button>

          <input
            type="number"
            className="input quantity-selector__quantity-input"
            id="quantity"
            name="quantity"
            value={cartState[index].quantity}
            min="1"
            max="99"
          />

          <button
            className="button button--transparent h-padding-xxs quantity-selector__button"
            onClick={() => cartDispatch({ type: "add-item", item: item })}
          >
            <svg className="icon quantity-selector__icon" aria-hidden="true">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="/assets/icons/icon-sprite.svg#plus-circle"
              ></use>
            </svg>
            <span className="hide-visually">SR only text</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartArticle
