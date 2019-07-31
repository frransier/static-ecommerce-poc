/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Header from "./header"
import "../../static/css/static-ecommerce-poc-styleguide.css"

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

  return (
    // <>
    //   <Header siteTitle={data.site.siteMetadata.title} />
    //   <div
    //     style={{
    //       margin: `0 auto`,
    //       maxWidth: 960,
    //       padding: `0px 1.0875rem 1.45rem`,
    //       paddingTop: 0,
    //     }}
    //   >
    //     <main>{children}</main>
    //     <br />
    //     <footer>
    //       <br />
    //       The SNAG stack: {` `}
    //       <a href="https://www.sanity.io">Sanity</a>,{` `}
    //       <a href="https://www.netlify.com">Netlify</a>,{` `}
    //       <a href="https://www.algolia.com">Algolia</a>,{` `}
    //       <a href="https://www.gatsbyjs.org">Gatsby</a>,{` `}
    //       <a href="https://www.snipcart.com">Snipcart</a>
    //       {` `}
    //     </footer>
    //   </div>
    // </>
    <div className="master">
    <div className="master__inner">
      <div className="master__header">
        <Header siteTitle={data.site.siteMetadata.title} />
      </div>
      <div className="master__content">
        {children}
      </div>
      <div className="master__footer">
        <footer className="site-footer" role="contentinfo">
          <section className="section section--no-y-padding">
            <div className="grid grid--no-gutter-xs grid--col-xs-1">
              <div className="grid__item grid__item--no-gutter-xs grid__item--6">
                <ul className="accordion site-footer__accordion">
                  <li className="accordion__collapsible">
                    <div className="collapsible" data-js="collapsible">
                      <div className="collapsible__title">
                        Om oss
                        <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                        </svg><span className="hide-visually">SR only text</span>
                      </div>
                      <div className="collapsible__content-wrapper">
                        <div className="collapsible__content">
                          Something
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="accordion__collapsible">
                    <div className="collapsible" data-js="collapsible">
                      <div className="collapsible__title">
                        Varumärken
                        <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                        </svg><span className="hide-visually">SR only text</span>
                      </div>
                      <div className="collapsible__content-wrapper">
                        <div className="collapsible__content">
                          Something
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="accordion__collapsible">
                    <div className="collapsible" data-js="collapsible">
                      <div className="collapsible__title">
                        Kontakt
                        <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                        </svg><span className="hide-visually">SR only text</span>
                      </div>
                      <div className="collapsible__content-wrapper">
                        <div className="collapsible__content">
                          Something
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid__item grid__item--no-gutter-xs grid__item--6">
                <ul className="accordion site-footer__accordion">
                  <li className="accordion__collapsible">
                    <div className="collapsible" data-js="collapsible">
                      <div className="collapsible__title">
                        Jaktia-kortet
                        <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                        </svg><span className="hide-visually">SR only text</span>
                      </div>
                      <div className="collapsible__content-wrapper">
                        <div className="collapsible__content">
                          Something
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="accordion__collapsible">
                    <div className="collapsible" data-js="collapsible">
                      <div className="collapsible__title">
                        Club Jaktia
                        <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                        </svg><span className="hide-visually">SR only text</span>
                      </div>
                      <div className="collapsible__content-wrapper">
                        <div className="collapsible__content">
                          Something
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="accordion__collapsible">
                    <div className="collapsible" data-js="collapsible">
                      <div className="collapsible__title">
                        Sociala medier
                        <svg className="icon icon--fill collapsible__icon" aria-hidden="true">
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#plus" />
                        </svg><span className="hide-visually">SR only text</span>
                      </div>
                      <div className="collapsible__content-wrapper">
                        <div className="collapsible__content">
                          Something
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid__item grid__item--no-gutter-xs grid__item--6">
                <ul className="list list--unstyled h-padding-top-lg">
                  <li className="list-item list-item--no-padding">
                    <a href="#" className="site-footer__link">Köp- och leveransvillkor</a>
                  </li>
                  <li className="list-item list-item--no-padding">
                    <a href="#" className="site-footer__link">Garantier</a>
                  </li>
                  <li className="list-item list-item--no-padding">
                    <a href="#" className="site-footer__link">Integritetspolicy</a>
                  </li>
                  <li className="list-item list-item--no-padding">
                    <a href="#" className="site-footer__link">Nyhetsbrev</a>
                  </li>
                </ul>
                <ul className="list list--unstyled list--horizontal site-footer__icon-list">
                  <li className="list-item site-footer__icon-list-item">
                    <a href="#">
                      <svg className="icon icon--fill" aria-hidden="true">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#flag-se" />
                      </svg><span className="hide-visually">SR only text</span>
                    </a>
                  </li>
                  <li className="list-item site-footer__icon-list-item">
                    <a href="#">
                      <svg className="icon icon--fill" aria-hidden="true">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#flag-dk" />
                      </svg><span className="hide-visually">SR only text</span>
                    </a>
                  </li>
                  <li className="list-item site-footer__icon-list-item">
                    <a href="#">
                      <svg className="icon icon--fill" aria-hidden="true">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#flag-no" />
                      </svg><span className="hide-visually">SR only text</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="grid__item grid__item--no-gutter-xs grid__item--6">
                <div className="site-footer__text h-padding-top-lg">
                  © Copyright | Jaktia 2018 <br />Den här webbplatsen använder cookies|Alla priser gäller
                  så långt lagret räcker och kan inte kombineras med andra erbjudanden|Sortimentet kan
                  variera från butik till butik |Med reservation
                  för eventuella valutaförändringar, avvikelser och tryckfel
                </div>
                <ul className="list list--unstyled list--horizontal site-footer__icon-list">
                  <li className="list-item site-footer__icon-list-item">
                    <svg className="icon icon--fill icon--lg" aria-hidden="true">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#visa" />
                    </svg><span className="hide-visually">SR only text</span>
                  </li>
                  <li className="list-item site-footer__icon-list-item">
                    <svg className="icon icon--fill icon--lg" aria-hidden="true">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#mastercard" />
                    </svg><span className="hide-visually">SR only text</span>
                  </li>
                  <li className="list-item site-footer__icon-list-item">
                    <svg className="icon icon--fill icon--lg" aria-hidden="true">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#amex" />
                    </svg><span className="hide-visually">SR only text</span>
                  </li>
                  <li className="list-item site-footer__icon-list-item">
                    <svg className="icon icon--fill icon--xl" aria-hidden="true">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#https" />
                    </svg><span className="hide-visually">SR only text</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </footer>
      </div>
      <aside className="master__menu-wrapper">
        <div className="master__aside-sticky">
          <div className="master__aside-head">
            <img src="/assets/images/jaktia-logo-red.svg" />
            <button className="button button--transparent h-padding-0" data-js="master-menu-toggle">
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
                <a className="button button--is-link button--red button--full-width button--text-center button-icon" href>
                  <svg className="icon icon--xs button-icon__icon" aria-hidden="true">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/assets/icons/icon-sprite.svg#double-chevron" />
                  </svg><span className="hide-visually">Go to the checkout</span>
                  <span className="button-icon__text">Till kassan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="overlay overlay--dark master__overlay">
      </div>
    </div>
  </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
