/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import qs from "qs"

import { InstantSearch } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Header from "./header"
import Footer from "./footer"
import Overlay from "./overlay"
import Menu from "./menu"
import CartArticle from "./cartArticle"

import "../../static/css/static-ecommerce-poc-styleguide.css"

import { LayoutContext, CartContext } from "../context/LayoutStore"

const searchClient = algoliasearch(
  "8EDH67ODRS",
  "3a599a08fde10c670966018cd5db6b2a"
)

/*** SearchState and History stuff ***/

const HISTORY_DEBOUNCE_TIME = 300 // Controls how often we save browser history
const createURL = state => `?${qs.stringify(state)}` // Create query params string
const searchStateToUrl = searchState =>
  searchState ? `${window.location.pathname}${createURL(searchState)}` : "" // Create full url from searchState
const urlToSearchState = ({ search }) => qs.parse(search.slice(1)) // Create searchState from query params
/************************************/

const Layout = ({ menuIsVisible, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [state, dispatch] = useContext(LayoutContext)
  const [cartState, cartDispatch] = useContext(CartContext)

  //   const subtotal = cartState
  //     .map(a => a.price * a.quantity)
  //     .reduce((a, b) => a + b, 0)
  //   const tax = Math.round(
  //     cartState.map(a => a.price * a.quantity).reduce((a, b) => a + b, 0) * 0.2
  //   )

  const total = Math.round(
    cartState.map(a => a.price * a.quantity).reduce((a, b) => a + b, 0) * 1.25
  )
  const totalQuantity = Math.round(
    cartState.map(a => a.quantity).reduce((a, b) => a + b, 0)
  )

  /*** SearchState and History stuff ***/
  const [searchState, setSearchState] = useState(
    typeof window === "undefined" ? {} : urlToSearchState(window.location)
  )
  const [debouncedSetState, setDebouncedSetState] = useState(null)
  const onSearchStateChange = updatedSearchState => {
    if (typeof window === "undefined") return // netlify build has no window object
    clearTimeout(debouncedSetState)
    setDebouncedSetState(
      setTimeout(() => {
        window.history.replaceState(
          {},
          "",
          searchStateToUrl(updatedSearchState)
        )
      }, HISTORY_DEBOUNCE_TIME)
    )
    setSearchState(updatedSearchState)
  }
  /************************************/

  return (
    <div className={`master ${menuIsVisible ? "master--menu-is-visible" : ""}`}>
      <InstantSearch
        searchClient={searchClient}
        indexName="static-ecommerce-poc"
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <div
          className={`master__inner
              ${state.menuIsOpen ? "master__inner--menu-is-open" : ""}
              ${state.cartIsOpen ? "master__inner--cart-is-open" : ""}
              ${state.searchIsOpen ? "master__inner--search-is-open" : ""}
            `}
        >
          <div className="master__header">
            <Header
              siteTitle={data.site.siteMetadata.title}
              totalQuantity={totalQuantity}
            />
          </div>
          {menuIsVisible && <div className="master__slot-top"></div>}
          <div className="master__content">{children}</div>
          <div className="master__footer">
            <Footer />
          </div>
          <aside className="master__menu-wrapper">
            <div className="master__aside-sticky">
              <div className="master__aside-head">
                <img alt="logo" src="/assets/images/jaktia-logo-red.svg" />
                <button
                  className="button button--transparent h-padding-0"
                  onClick={() => dispatch({ type: "CLOSE_MENU" })}
                >
                  <svg className="icon button-icon__icon" aria-hidden="true">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="/assets/icons/icon-sprite.svg#remove"
                    />
                  </svg>
                  <span className="hide-visually">Close menu</span>
                </button>
              </div>
              <div className="master__menu-inner">
                <Menu />
              </div>
            </div>
          </aside>
          <aside className="master__cart-wrapper">
            <div className="master__aside-sticky">
              <div className="master__aside-head">
                <h4 className="master__aside-heading">Varukorg</h4>
                <button
                  className="button button--transparent h-padding-0"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                >
                  <svg className="icon button-icon__icon" aria-hidden="true">
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="/assets/icons/icon-sprite.svg#remove"
                    />
                  </svg>
                  <span className="hide-visually">Close mini cart</span>
                </button>
              </div>
              <div className="master__cart-inner">
                <div className="mini-cart">
                  <div className="mini-cart__articles">
                    {cartState.map((item, index) => (
                      <CartArticle item={item} index={index} />
                    ))}
                  </div>
                  <div className="mini-cart__footer">
                    <button
                      onClick={() =>
                        cartDispatch({
                          type: "clear-cart",
                        })
                      }
                    >
                      {total === 0 ? "Cart is empty" : "Clear cart"}
                    </button>
                    <div className="mini-cart__sum">
                      <span className="mini-cart__sum-label">Totalsumma:</span>
                      <span className="mini-cart__sum-price">{total}:-</span>
                      {/* <div>Subtotal: {subtotal}</div> */}
                      {/* <div>Tax: {tax}</div> */}
                    </div>
                    <AniLink
                      className="button button--is-link button--red button--full-width button--text-center button-icon"
                      to="/"
                    >
                      <svg
                        className="icon icon--xs button-icon__icon"
                        aria-hidden="true"
                      >
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="/assets/icons/icon-sprite.svg#double-chevron"
                        />
                      </svg>
                      <span className="hide-visually">Go to the checkout</span>
                      <span className="button-icon__text">Till kassan</span>
                    </AniLink>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <Overlay />
        </div>
      </InstantSearch>
    </div>
  )
}

export default Layout
