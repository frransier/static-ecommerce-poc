import { Link } from "gatsby"
import React, { useContext, useState, useEffect } from "react"

import Search from "./search"

import { LayoutContext } from "../context/LayoutStore"

const totalQuantStyling = {
  position: "absolute",
  background: "red",
  color: "white",
  height: "18px",
  width: "18px",
  borderRadius: "100%",
  textAlign: "center",
  top: "35px",
  lineHeight: "18px",
  left: "25px",
}

const Header = ({ totalQuantity, isTransparent }) => {
  const [, dispatch] = useContext(LayoutContext)
  const [isScrolled, setIsScrolled] = useState(0)
  const handleScroll = () => {
    // TODO: Throttle me!
    document.body.scrollTop > 100 ? setIsScrolled(true) : setIsScrolled(false)
  }
  useEffect(() => {
    document.body.addEventListener("scroll", handleScroll)
    return () => {
      document.body.removeEventListener("scroll", handleScroll)
    }
  }, [document.body.scrollTop])

  return (
    <header
      className={`site-header ${
        isTransparent && !isScrolled ? "site-header--transparent" : ""
      }`}
      role="banner"
    >
      <section className="section section--no-y-padding site-header__section">
        <div className="site-header__left-area">
          <button
            className="button button--transparent site-header__menu-button"
            onClick={() => dispatch({ type: "TOGGLE_MENU" })}
          >
            <svg className="icon" aria-hidden="true">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="/assets/icons/icon-sprite.svg#hamburger"
              />
            </svg>
            <span className="hide-visually">SR only text</span>
          </button>
          <Link
            className="button button--is-link button--transparent h-padding-y-0 site-header__logo-button"
            to="/"
          >
            <svg className="icon icon--xl" aria-hidden="true">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="/assets/icons/icon-sprite.svg#logo"
              />
            </svg>
            <span className="hide-visually">SR only text</span>
          </Link>
        </div>
        <div className="site-header__right-area">
          <ul className="top-nav" role="navigation">
            <li className="top-nav__item">
              <Link
                className="top-nav__link top-nav__link--is-current"
                to="/products"
              >
                Sortiment
              </Link>
            </li>
            <li className="top-nav__item">
              <Link
                className="top-nav__link top-nav__link--is-current"
                to="/stories"
              >
                Inspiration
              </Link>
            </li>
            <li className="top-nav__item">
              <Link
                className="top-nav__link top-nav__link--is-current"
                to="/news"
              >
                Notiser
              </Link>
            </li>
            <li className="top-nav__item">
              <Link
                className="top-nav__link top-nav__link--is-current"
                to="/contact"
              >
                Kontakt
              </Link>
            </li>
          </ul>
          <button
            className="button button--transparent h-padding-y-0 site-header__search-button"
            onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}
          >
            <svg className="icon" aria-hidden="true">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="/assets/icons/icon-sprite.svg#search"
              />
            </svg>
            <span className="hide-visually">SR only text</span>
          </button>

          <button
            style={{ position: "relative" }}
            className="button button--transparent h-padding-y-0 site-header__cart-button"
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
          >
            <svg className="icon" aria-hidden="true">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="/assets/icons/icon-sprite.svg#cart"
              />
            </svg>
            <span className="hide-visually">SR only text</span>
            {totalQuantity > 0 && (
              <span style={totalQuantStyling}>{totalQuantity}</span>
            )}
          </button>
        </div>
      </section>
      <Search showResults isInSiteHeader autoFocus />
    </header>
  )
}

export default Header
