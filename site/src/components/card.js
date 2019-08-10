import React from "react"

import AniLink from "gatsby-plugin-transition-link"

const Card = ({ data }) => {
  return (
    <AniLink
      to={`stories/${data.slug.current}`}
      className="card card--slim card--has-background-cover"
      style={{
        backgroundImage: `url(${data.image.asset.fixed.src})`,
      }}
    >
      <div className="card__body">
        <div className="card__tags">
          <span
            className="tag tag--red tag--has-background-cover tag--filled"
            title="Jakt"
          >
            Jakt
          </span>
        </div>
        <div className="card__pre-heading">
          Jaktia pro team
          <time className="card__timestamp">{data._updatedAt}</time>
        </div>
        <h2 className="card__heading">{data.title}</h2>
        <div className="card__footer">
          <button className="button button--transparent button--text-center h-padding-0">
            <svg className="icon icon--xs button-icon__icon" aria-hidden="true">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="/assets/icons/icon-sprite.svg#double-chevron"
              ></use>
            </svg>
            <span className="button-icon__text">Läs mer</span>
          </button>
        </div>
      </div>
    </AniLink>
  )
}

export default Card
