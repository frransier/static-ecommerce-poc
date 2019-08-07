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

import Header from "./header"
import Footer from "./footer"
import Overlay from "./overlay"
import Menu from "./menu"
import "../../static/css/static-ecommerce-poc-styleguide.css"

import { LayoutContext } from "../context/LayoutStore"

const HISTORY_DEBOUNCE_TIME = 300 // Controls how often we save browser history
const searchClient = algoliasearch(
  "8EDH67ODRS",
  "3a599a08fde10c670966018cd5db6b2a"
)

const createURL = state => `?${qs.stringify(state)}`

const searchStateToUrl = searchState =>
  searchState ? `${window.location.pathname}${createURL(searchState)}` : ""

const urlToSearchState = ({ search }) => qs.parse(search.slice(1))

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
  // eslint-disable-next-line no-restricted-globals
  const [searchState, setSearchState] = useState(
    typeof window === "undefined" ? {} : urlToSearchState(window.location)
  )
  const [debouncedSetState, setDebouncedSetState] = useState(null)

  const onSearchStateChange = updatedSearchState => {
    if (typeof window === "undefined") return // netlify build has no window object
    clearTimeout(debouncedSetState)

    setDebouncedSetState(
      setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        window.history.pushState({}, "", searchStateToUrl(updatedSearchState))
      }, HISTORY_DEBOUNCE_TIME)
    )

    setSearchState(updatedSearchState)
  }

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
            <Header siteTitle={data.site.siteMetadata.title} />
          </div>
          <div className="master__slot-top">
            {/* <header
              className="hero hero--slim"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/1920x800/?hunting")',
              }}
            >
              <div className="hero__body">
                <div className="hero__pre-heading">Sortiment</div>
                <div className="hero__intro">
                  Hos Jaktia finner du ett komplett sortiment inom jakt, vapen,
                  fiske, hund och fritid.
                </div>
              </div>
            </header> */}
          </div>
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
                    CART ARTICLES GOES HERE
                  </div>
                  <div className="mini-cart__footer">
                    <div className="mini-cart__sum">
                      <span className="mini-cart__sum-label">Totalsumma:</span>
                      <span className="mini-cart__sum-price">10.666:-</span>
                    </div>
                    {/* <a className="button button--is-link button--red button--full-width button--text-center button-icon" href>
                        <svg className="icon icon--xs button-icon__icon" aria-hidden="true">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#double-chevron" />
                        </svg><span className="hide-visually">Go to the checkout</span>
                        <span className="button-icon__text">Till kassan</span>
                      </a> */}
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
