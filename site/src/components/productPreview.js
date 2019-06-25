import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"

const ProductPreview = ({ hit }) => {
  console.log(hit)

  return (
    <div key={hit.id}>
      <div>
        <img src={hit.images[0].asset.fixed.src} alt={hit.title} />
        <br />
        <Link to={`/products/${hit.slug.current}`}>
          <Highlight hit={hit} attribute="title" tagName="mark" />
        </Link>
        <br />
        <div>
          Categories:
          {hit.categories.map((category, index) => (
            <div key={category.title}>
              <div>
                <Link to={`/${category.slug.current}/`}>
                  <Highlight
                    hit={hit}
                    attribute={`categories[${index}].title`}
                    tagName="mark"
                  />
                </Link>
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
