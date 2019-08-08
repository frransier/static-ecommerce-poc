import React, { createContext, useReducer } from "react"

const initialState = {
  searchIsOpen: false,
  menuIsOpen: false,
  cartIsOpen: false,
}

const initialCart = []

const reducer = (state, action) => {
  const stateChanges = () => {
    switch (action.type) {
      case "TOGGLE_SEARCH":
        return { searchIsOpen: !state.searchIsOpen }
      case "TOGGLE_MENU":
        return {
          menuIsOpen: !state.menuIsOpen,
          searchIsOpen: false,
        }
      case "TOGGLE_CART":
        return {
          cartIsOpen: !state.cartIsOpen,
          searchIsOpen: false,
        }
      case "OPEN_SEARCH":
        return { searchIsOpen: true }
      case "OPEN_MENU":
        return { menuIsOpen: true }
      case "OPEN_CART":
        return { cartIsOpen: true }
      case "CLOSE_SEARCH":
        return { searchIsOpen: false }
      case "CLOSE_MENU":
        return { menuIsOpen: false }
      case "CLOSE_CART":
        return { cartIsOpen: false }
      case "CLOSE_ALL":
        return {
          searchIsOpen: false,
          menuIsOpen: false,
          cartIsOpen: false,
        }
      default:
        return {}
    }
  }

  return { ...state, ...stateChanges() }
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add-item":
      return [...state, action.item]
    case "remove-item":
      return state.filter((_, index) => index !== action.index)

    case "remove-line-item":
      return console.log("clear line item")
    case "clear-cart":
      return console.log("clear cart")
    default:
      return state
  }
}

export const LayoutContext = createContext()
export const CartContext = createContext()

export const LayoutStore = props => {
  const stateHook = useReducer(reducer, initialState)
  const cartHook = useReducer(cartReducer, initialCart)
  return (
    <LayoutContext.Provider value={stateHook}>
      <CartContext.Provider value={cartHook}>
        {props.children}
      </CartContext.Provider>
    </LayoutContext.Provider>
  )
}
