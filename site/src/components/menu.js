import React, { useContext } from "react"

import { Link } from "gatsby"

import ProductMenu from "./productMenu"
import { LayoutContext } from "./../context/LayoutStore"

const Menu = ({ showProductMenu }) => {
  const [, dispatch] = useContext(LayoutContext)

  return (
    <ul className="main-menu" role="navigation">
      <li className="main-menu__item main-menu__item--level-1">
        <Link to="/products" className="main-menu__link">
          Sortiment
        </Link>
        {showProductMenu && (
          <ProductMenu
            attributes={["categories.lvl0", "categories.lvl1"]}
            limit={100}
            showAllProductsLink
          />
        )}
      </li>
      <li className="main-menu__item main-menu__item--level-1">
        <Link
          to="/stories"
          className="main-menu__link"
          onClick={() => dispatch({ type: "CLOSE_MENU" })}
        >
          Inspiration
        </Link>
      </li>
      <li className="main-menu__item main-menu__item--level-1">
        <Link
          to="/news"
          className="main-menu__link"
          onClick={() => dispatch({ type: "CLOSE_MENU" })}
        >
          Notiser
        </Link>
      </li>
      <li className="main-menu__item main-menu__item--level-1">
        <Link
          to="/contact"
          className="main-menu__link"
          onClick={() => dispatch({ type: "CLOSE_MENU" })}
        >
          Kontakt
        </Link>
      </li>
    </ul>
  )
}

export default Menu
