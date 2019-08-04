import React, { useContext } from "react"
import { LayoutContext } from "../context/LayoutStore"

const Overlay = () => {
  const [state, dispatch] = useContext(LayoutContext)
  const showOverlay = state.searchIsOpen || state.menuIsOpen || state.cartIsOpen
  return (
    <div
      className={`overlay overlay--dark master__overlay ${
        showOverlay ? "overlay--is-visible" : ""
      }`}
      onClick={() => dispatch({ type: "CLOSE_ALL" })}
    ></div>
  )
}

export default Overlay
