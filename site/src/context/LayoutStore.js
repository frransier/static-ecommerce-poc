import React, { createContext, useReducer } from "react"

const initialState = {
  searchIsOpen: false,
  menuIsOpen: false,
  cartIsOpen: false,
}
var initialCart = []
typeof window !== "undefined"
  ? (initialCart = JSON.parse(localStorage.getItem("jaktia-cart")) || [])
  : (initialCart = [])

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
      const foundIndex = state.findIndex(
        x => x.articleNo === action.item.articleNo
      )
      if (foundIndex > -1) {
        const increment = {
          ...action.item,
          quantity: action.item.quantity + 1,
          price: state[foundIndex].price,
        }
        state[foundIndex] = increment
        localStorage.setItem("jaktia-cart", JSON.stringify([...state]))
        return [...state]
      } else {
        localStorage.setItem(
          "jaktia-cart",
          JSON.stringify([...state, action.item])
        )
        return [...state, action.item]
      }

    case "remove-item":
      if (state[action.index].quantity > 1) {
        const decrement = {
          ...state[action.index],
          quantity: state[action.index].quantity - 1,
          price: state[action.index].price,
        }
        state[action.index] = decrement
        localStorage.setItem("jaktia-cart", JSON.stringify([...state]))
        return [...state]
      } else {
        localStorage.setItem(
          "jaktia-cart",
          JSON.stringify(state.filter((_, index) => index !== action.index))
        )
        return state.filter((_, index) => index !== action.index)
      }

    case "remove-line-item":
      localStorage.setItem(
        "jaktia-cart",
        JSON.stringify(state.filter((_, index) => index !== action.index))
      )
      return state.filter((_, index) => index !== action.index)
    case "clear-cart":
      localStorage.setItem("jaktia-cart", JSON.stringify([]))
      return []
    default:
      return state
  }
}

const klarnaReducer = (state, action) => {
  switch (action.type) {
    case "set-klarna-id":
      return action.klarnaId
    case "clear-klarna-id":
      return ""
    default:
      return state
  }
}

export const LayoutContext = createContext()
export const CartContext = createContext()
export const KlarnaContext = createContext()

export const LayoutStore = props => {
  const stateHook = useReducer(reducer, initialState)
  const cartHook = useReducer(cartReducer, initialCart)
  const klarnaHook = useReducer(klarnaReducer, "")
  return (
    <LayoutContext.Provider value={stateHook}>
      <CartContext.Provider value={cartHook}>
        <KlarnaContext.Provider value={klarnaHook}>
          {props.children}
        </KlarnaContext.Provider>
      </CartContext.Provider>
    </LayoutContext.Provider>
  )
}
