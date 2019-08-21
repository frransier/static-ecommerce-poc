import React from "react"

import { Link } from "gatsby"

import ProductMenu from "./productMenu"

const Menu = ({ showProductMenu }) => (
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
      <Link to="/stories" className="main-menu__link">
        Inspiration
      </Link>
    </li>
    <li className="main-menu__item main-menu__item--level-1">
      <Link to="/news" className="main-menu__link">
        Notiser
      </Link>
    </li>
    <li className="main-menu__item main-menu__item--level-1">
      <Link to="/contact" className="main-menu__link">
        Kontakt
      </Link>
    </li>
  </ul>
)

export default Menu
