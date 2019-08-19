import React from "react"

import { connectHierarchicalMenu } from "react-instantsearch-dom"

const ProductMenu = ({
  items,
  refine,
  currentRefinement,
  showAllProductsLink,
  createURL,
}) => {
  return (
    <ul className="main-menu main-menu--submenu main-menu--submenu-is-visible">
      {showAllProductsLink ? (
        <li className="main-menu__item main-menu__item--level-2">
          {/* eslint-disable-next-line */}
          <a
            className={`main-menu__link ${
              currentRefinement === null ? " main-menu__link--is-current " : ""
            }`}
            href=""
            onClick={event => {
              event.preventDefault()
              refine()
            }}
          >
            Alla produkter
          </a>
        </li>
      ) : (
        ""
      )}
      {items.map(item => (
        <li
          className="main-menu__item main-menu__item--level-2"
          key={item.label}
        >
          <a
            className={`main-menu__link
                ${item.isRefined ? " main-menu__link--is-current " : ""}
                ${
                  item.items
                    ? " main-menu__link--has-submenu main-menu__link--is-current main-menu__link--submenu-is-visible" // TODO: Is there a way to see if a lvl0 category has children before refining with it?
                    : ""
                }
            `}
            href={createURL(item.value)}
            onClick={event => {
              event.preventDefault()
              refine(item.value)
            }}
          >
            {item.label}
          </a>
          {item.items && (
            <ProductMenu
              items={item.items}
              refine={refine}
              createURL={createURL}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default connectHierarchicalMenu(ProductMenu)
