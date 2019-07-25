import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { Highlight } from "react-instantsearch-dom"
import { motion } from "framer-motion"

const ProductPreview = ({ hit }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
    >
      <div key={hit.id}>
        <div>
          <img src={hit.images[0].asset.fixed.src} alt={hit.title} />
          <br />
          <AniLink fade to={`/products/${hit.slug.current}`} duration={0.3}>
            <Highlight hit={hit} attribute="title" tagName="mark" />
          </AniLink>
          <br />
          <div>
            Categories:
            {hit.categories.map((category, index) => (
              <div key={category.title}>
                <div>
                  <AniLink
                    fade
                    to={`/${category.slug.current}/`}
                    duration={0.3}
                  >
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
    </motion.div>
  )
}

export default ProductPreview
