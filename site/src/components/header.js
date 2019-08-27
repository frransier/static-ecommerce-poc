import { Link, useStaticQuery, graphql } from "gatsby"
import React, { useContext, useState, useEffect } from "react"
import { mapEdgesToNodes } from "../helpers/helpers"
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
  const data = useStaticQuery(graphql`
    {
      allSanitySettings {
        edges {
          node {
            _rawNavLinks
          }
        }
      }
    }
  `)

  const edges = mapEdgesToNodes(data.allSanitySettings)
  const navlinks = edges[0]._rawNavLinks

  const handleScroll = () => {
    // TODO: Throttle me!!
    Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop,
      document.querySelector(".master__cart-wrapper > .master__aside-sticky") // For iOS + Chrome... (ノಠ益ಠ)ノ彡┻━┻
        .offsetTop
    ) > 100
      ? setIsScrolled(true)
      : setIsScrolled(false)
  }

  useEffect(() => {
    document.body.addEventListener("scroll", handleScroll)
    return () => {
      document.body.removeEventListener("scroll", handleScroll)
    }
  }, [typeof window === "undefined" ? null : document.body.scrollTop])

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
            {navlinks.map((link, index) => {
              return (
                <li key={index} className="top-nav__item">
                  <Link
                    className="top-nav__link top-nav__link--is-current"
                    to={`/${link.slug}`}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
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
