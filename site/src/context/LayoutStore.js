import React, { createContext, useReducer } from "react"

const initialState = {
  searchIsOpen: false,
  menuIsOpen: false,
  cartIsOpen: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SEARCH":
      return { ...state, searchIsOpen: !state.searchIsOpen }
    case "TOGGLE_MENU":
      return { ...state, menuIsOpen: !state.menuIsOpen }
    case "TOGGLE_CART":
      return { ...state, cartIsOpen: !state.cartIsOpen }
    case "OPEN_SEARCH":
      return { ...state, searchIsOpen: true }
    case "OPEN_MENU":
      return { ...state, menuIsOpen: true }
    case "OPEN_CART":
      return { ...state, cartIsOpen: true }
    case "CLOSE_SEARCH":
      return { ...state, searchIsOpen: false }
    case "CLOSE_MENU":
      return { ...state, menuIsOpen: false }
    case "CLOSE_CART":
      return { ...state, cartIsOpen: false }
    case "CLOSE_ALL":
      return {
        ...state,
        searchIsOpen: false,
        menuIsOpen: false,
        cartIsOpen: false,
      }
    default:
      return state
  }
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
