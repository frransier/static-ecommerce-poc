import React, { useContext } from "react"

import { connectHierarchicalMenu } from "react-instantsearch-dom"

import { LayoutContext } from "./../context/LayoutStore"

const ProductMenu = ({
  items,
  refine,
  currentRefinement,
  showAllProductsLink,
  createURL,
  closeMenuOnClick,
}) => {
  const [, dispatch] = useContext(LayoutContext)

  const closeMenu = () =>
    closeMenuOnClick ? dispatch({ type: "CLOSE_MENU" }) : ""

  return (
    <ul className="main-menu main-menu--submenu main-menu--submenu-is-visible">
      {showAllProductsLink ? (
        <li className="main-menu__item main-menu__item--level-2">
          {/* eslint-disable-next-line */}
          <a
            name="all products"
            className={`main-menu__link ${
              currentRefinement === null ? " main-menu__link--is-current " : ""
            }`}
            href=""
            onClick={event => {
              event.preventDefault()
              refine()
              dispatch({ type: "CLOSE_MENU" })
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
            name="more"
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
              closeMenu()
            }}
          >
            {item.label}
          </a>
          {item.items && (
            <ProductMenu
              items={item.items}
              refine={refine}
              createURL={createURL}
              closeMenuOnClick
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default connectHierarchicalMenu(ProductMenu)
