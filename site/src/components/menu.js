import React from "react"

import AniLink from "gatsby-plugin-transition-link/AniLink"

import ProductMenu from "./productMenu"

const Menu = () => (
  <ul className="main-menu" role="navigation">
    <li className="main-menu__item main-menu__item--level-1">
      <AniLink
        to="/products"
        className="main-menu__link main-menu__link--has-submenu main-menu__link--is-current main-menu__link--submenu-is-visible main-menu__link--is-active"
      >
        Sortiment
      </AniLink>
      <ProductMenu
        attributes={["categories.lvl0", "categories.lvl1"]}
        limit={100}
        showAllProductsLink
      />
    </li>
    <li className="main-menu__item main-menu__item--level-1">
      <AniLink to="/stories" className="main-menu__link">
        Inspiration
      </AniLink>
    </li>
    <li className="main-menu__item main-menu__item--level-1">
      <AniLink to="/news" className="main-menu__link">
        Notiser
      </AniLink>
    </li>
    <li className="main-menu__item main-menu__item--level-1">
      <AniLink to="/contact" className="main-menu__link">
        Kontakt
      </AniLink>
    </li>
  </ul>
)

export default Menu
