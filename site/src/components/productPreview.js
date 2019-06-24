import React from "react"
import { Link } from "gatsby"

const ProductPreview = ({ hit }) => {
  return (
    <div key={hit.id}>
      <div>
        <img
          src={hit.defaultProductVariant.images[0].asset.fixed.src}
          alt={hit.title}
        />
        <br />
        <Link to={`/products/${hit.slug.current}`}>{hit.title}</Link>
        <br />
        <div>
          Categories:
          {hit.categories.map(category => (
            <div key={category.title}>
              <div>
                <Link to={`/${category.slug.current}/`}>{category.title}</Link>
              </div>
            </div>
          ))}
        </div>
        <p>Price: {hit.defaultProductVariant.price} kr</p>
      </div>
      <br />
    </div>
  )
}

export default ProductPreview
