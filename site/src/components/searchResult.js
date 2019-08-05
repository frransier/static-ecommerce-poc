import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import { connectHits, Highlight } from "react-instantsearch-dom"

const SearchResult = ({ hits }) => (
  <ul className="search-result__list">
    <li className="search-result__item">
      {hits.map(hit => (
        <AniLink
          to={hit.slug ? `/products/${hit.slug.current}` : "/"}
          className="search-article"
        >
          <div className="search-article__image-container">
            <img
              src={hit.asset.fixed.srcWebp}
              alt={hit.title}
              className="search-article__image"
            />
          </div>
          <div className="search-article__name-container">
            <div className="product-name product-name--break">
              <span className="product-name__brand">Famous Card Company</span>
              <h2 className="product-name__name product-name__name--inherit-size">
                <Highlight hit={hit} attribute="title" tagName="mark" />
              </h2>
            </div>
            <span className="stock-status stock-status--few-in-stock stock-status--discrete">
              <span className="stock-status__text">Få i lager</span>
            </span>
          </div>
          <div className="search-article__details-container">
            <div className="search-article__details-placement">
              <div className="product-price h-flex-align-end">
                <strong className="product-price__discounted">249:-</strong>
                <span className="product-price__regular product-price__regular--is-not-current">
                  Ord. 500:-
                </span>
              </div>
            </div>
          </div>
        </AniLink>
      ))}
    </li>
  </ul>
)

export default connectHits(SearchResult)