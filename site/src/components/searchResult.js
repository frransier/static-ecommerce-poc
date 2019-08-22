import React from "react"
import { Link } from "gatsby"
import { connectHits, Highlight } from "react-instantsearch-dom"

const SearchResult = ({ hits }) => {
  return (
    <div className="search__result-scroll">
      <div className="search-result">
        <h4 className="search-result__heading">Sortiment ({hits.length})</h4>
        <ul className="search-result__list">
          {hits.map(hit => (
            <li className="search-result__item" key={hit.objectID}>
              <Link
                to={hit.slug ? `/products/${hit.slug.current}` : "/"}
                className="search-article"
              >
                <div className="search-article__image-container">
                  <img
                    src={hit.asset.fixed.src}
                    alt={hit.title}
                    className="search-article__image"
                  />
                </div>
                <div className="search-article__name-container">
                  <div className="product-name product-name--break">
                    <span className="product-name__brand">
                      {hit["categories.lvl1"]}
                    </span>
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
                      <strong className="product-price__discounted">
                        {hit.discount}
                      </strong>
                      <span className="product-price__regular product-price__regular--is-not-current">
                        {hit.standard}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default connectHits(SearchResult)
