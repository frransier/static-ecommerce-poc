import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Hero = ({ data, hideButton, hidePreHeading, hideIntro, secondary }) => {
  const subFolder = () => {
    if (data._type === "story") return "stories"
    if (data._type === "news") return "news"
    return
  }
  return (
    <header
      className={`hero ${
        secondary !== undefined ? "hero--slim hero--headline2" : ""
      }`}
      style={{ backgroundImage: `url(${data.image.asset.fixed.src})` }}
    >
      <div className="hero__body">
        {!hidePreHeading && <div className="hero__pre-heading">Reportage</div>}
        <h1 className="hero__heading">{data.title}</h1>
        {!hideIntro && (
          <div className="hero__intro">
            <p>Håll dig uppdaterad om det senaste som händer inom Jaktia.</p>
          </div>
        )}
        {data.slug && !hideButton && (
          <AniLink
            to={`${subFolder()}/${data.slug.current}`}
            className="button button--is-link button-icon button--red button--text-center"
          >
            <svg aria-hidden="true" className="icon icon--xs button-icon__icon">
              <use
                xlinkHref="/assets/icons/icon-sprite.svg#double-chevron"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              ></use>
            </svg>
            <span className="button-icon__text">Läs artikeln</span>
          </AniLink>
        )}
      </div>
    </header>
  )
}

export default Hero
