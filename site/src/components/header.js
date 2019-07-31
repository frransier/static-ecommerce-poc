import AniLink from "gatsby-plugin-transition-link/AniLink"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="site-header" role="banner">
    <section className="section section--no-y-padding site-header__section">
      <div className="site-header__left-area">
        <button className="button button--transparent site-header__menu-button" data-js="master-menu-toggle">
          <svg className="icon" aria-hidden="true">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#hamburger" />
          </svg><span className="hide-visually">SR only text</span>
        </button>
        <AniLink className="button button--is-link button--transparent h-padding-y-0 site-header__logo-button" data-js="master-menu-toggle" to="/" fade duration={0.3}>
          <svg className="icon icon--xl" aria-hidden="true">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#logo" />
          </svg><span className="hide-visually">SR only text</span>
        </AniLink>
      </div>
      <div className="site-header__right-area">
        <ul className="top-nav" role="navigation">
          <li className="top-nav__item">
            <AniLink className="top-nav__link top-nav__link--is-current" to="/products" fade duration={0.3}>Sortiment</AniLink>
          </li>
          <li className="top-nav__item">
            <AniLink className="top-nav__link top-nav__link--is-current" to="/categories" fade duration={0.3}>Kategorier</AniLink>
          </li>
          <li className="top-nav__item">
            <AniLink className="top-nav__link top-nav__link--is-current" to="/vendors" fade duration={0.3}>Leverantörer</AniLink>
          </li>
          <li className="top-nav__item">
            <AniLink className="top-nav__link top-nav__link--is-current" to="/contact" fade duration={0.3}>Kontakt</AniLink>
          </li>
        </ul>
        <button className="button button--transparent h-padding-y-0 site-header__search-button" data-js="master-search-toggle">
          <svg className="icon" aria-hidden="true">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#search" />
          </svg><span className="hide-visually">SR only text</span>
        </button>
        <button className="button button--transparent h-padding-y-0 site-header__cart-button" data-js="master-cart-toggle">
          <svg className="icon" aria-hidden="true">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#cart" />
          </svg><span className="hide-visually">SR only text</span>
        </button>
      </div>
    </section>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
