import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { Highlight } from "react-instantsearch-dom"

const ProductPreview = ({ hit }) => {
  return (
    <div key={hit.id}>
      <div>
        <img src={hit.images[0].asset.fixed.src} alt={hit.title} />
        <br />
        <AniLink fade to={`/products/${hit.slug.current}`} duration={0.5}>
          <Highlight hit={hit} attribute="title" tagName="mark" />
        </AniLink>
        <br />
        <div>
          Categories:
          {hit.categories.map((category, index) => (
            <div key={category.title}>
              <div>
                <AniLink fade to={`/${category.slug.current}/`} duration={0.5}>
                  <Highlight
                    hit={hit}
                    attribute={`categories[${index}].title`}
                    tagName="mark"
                  />
                </AniLink>
              </div>
            </div>
          ))}
        </div>
        <p>Price: {hit.price} kr</p>
      </div>
      <br />
    </div>
  )
}

export default ProductPreview
