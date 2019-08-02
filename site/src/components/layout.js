/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { createContext, useReducer } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { InstantSearch } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import Header from "./header"
import Footer from "./footer"
import "../../static/css/static-ecommerce-poc-styleguide.css"

const searchClient = algoliasearch(
  "8EDH67ODRS",
  "3a599a08fde10c670966018cd5db6b2a"
)

const LayoutContext = createContext()
const initialState = {
  menuIsOpen: false,
  cartIsOpen: false
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        menuIsOpen: true,
        cartIsOpen: false
      }
    case 'TOGGLE_CART':
      return {
        menuIsOpen: false,
        cartIsOpen: true
      }
    default:
      return initialState
  }
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="master">
      <InstantSearch
        searchClient={searchClient}
        indexName="static-ecommerce-poc"
      >
        <div className={`master__inner master__inner--menu-is-open`}>
          <div className="master__header">
            <LayoutContext.Provider value={{ state, dispatch }}>
              <Header siteTitle={data.site.siteMetadata.title} />
            </LayoutContext.Provider>
          </div>
          <div className="master__content">
            {children}
          </div>
          <div className="master__footer">
            <Footer />
          </div>
          <aside className="master__menu-wrapper">
            <div className="master__aside-sticky">
              <div className="master__aside-head">
                <img alt="logo" src="/assets/images/jaktia-logo-red.svg" />
                <button
                  className="button button--transparent h-padding-0"
                  data-js="master-menu-toggle"
                >
                  <svg className="icon button-icon__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#remove" />
                  </svg><span className="hide-visually">Close menu</span>
                </button>
              </div>
              <div className="master__menu-inner">
                MENU GOES HERE
              </div>
            </div>
          </aside>
          <aside className="master__cart-wrapper">
            <div className="master__aside-sticky">
              <div className="master__aside-head">
                <h4 className="master__aside-heading">Varukorg</h4>
                <button className="button button--transparent h-padding-0" data-js="master-cart-toggle">
                  <svg className="icon button-icon__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#remove" />
                  </svg><span className="hide-visually">Close mini cart</span>
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
          <div className="overlay overlay--dark master__overlay">
          </div>
        </div>
      </InstantSearch>
  </div>
  )
}

export default Layout
