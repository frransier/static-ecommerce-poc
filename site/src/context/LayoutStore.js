import React, { createContext, useReducer } from "react"

const initialState = {
  searchIsOpen: false,
  menuIsOpen: false,
  cartIsOpen: false
}

const reducer = (state, action) => {
  const stateChanges = () => {
    switch (action.type) {
      case "TOGGLE_SEARCH":
        return { searchIsOpen: !state.searchIsOpen }
      case "TOGGLE_MENU":
        return {
          menuIsOpen: !state.menuIsOpen,
          searchIsOpen: false
        }
      case "TOGGLE_CART":
        return {
          cartIsOpen: !state.cartIsOpen,
          searchIsOpen: false
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
          cartIsOpen: false
        }
      default:
        return {}
    }
  }

  return { ...state, ...stateChanges() }
}

export const LayoutContext = createContext()

export const LayoutStore = props => {
  const stateHook = useReducer(reducer, initialState)
  return (
    <LayoutContext.Provider value={stateHook}>
      {props.children}
    </LayoutContext.Provider>
  )
}
