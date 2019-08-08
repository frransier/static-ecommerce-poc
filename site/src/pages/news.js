import React, { useState } from "react"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link"

import { mapEdgesToNodes } from "../helpers/helpers"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  {
    news: allSanityNews {
      edges {
        node {
          title
          image {
            asset {
              fixed(height: 116, width: 116) {
                src
              }
            }
          }
          slug {
            current
          }
          _updatedAt(formatString: "YYYY-MM-DD")
        }
      }
    }
    heroImage: sanityImageAsset(originalFilename: { eq: "miljo-hund.jpg" }) {
      fixed(width: 1507, height: 884) {
        src
      }
    }
  }
`

const News = props => {
  const { data } = props
  const newsNodes = mapEdgesToNodes(data.news)
  const [sortValue, setSortValue] = useState("asc")

  const sortNews = () => {
    if (sortValue === "asc") {
      return (a, b) => (a._updatedAt < b._updatedAt ? -1 : 1)
    } else if (sortValue === "desc") {
      return (a, b) => (a._updatedAt > b._updatedAt ? -1 : 1)
    }
  }

  return (
    <Layout>
      <SEO title="Notiser" />
      <header
        className="hero hero--slim hero--headline2"
        style={{ backgroundImage: `url(${data.heroImage.fixed.src})` }}
      >
        <div className="hero__body">
          <h1 className="hero__heading">Notiser</h1>
          <div className="hero__intro">
            <p>Håll dig uppdaterad om det senaste som händer inom Jaktia.</p>
          </div>
        </div>
      </header>
      <section className="section section--padding-bottom-xl">
        <div className="content-filter">
          <div className="content-filter__filters">
            <select
              value={sortValue}
              onChange={event => setSortValue(event.target.value)}
              className="input input--select content-filter__select"
            >
              <option className="input__option" value="desc">
                Senast uppdaterad
              </option>
              <option className="input__option" value="asc">
                Äldst uppdaterad
              </option>
            </select>
          </div>
        </div>
        <ul className="event-list">
          {newsNodes.sort(sortNews()).map((newsItem, index) => (
            <li className="event-list__item" key={index}>
              <AniLink
                to={`/news/${newsItem.slug.current}`}
                className="event-fragments event-fragments--responsive"
              >
                <div className="event-fragments__image-wrapper">
                  <img
                    src={newsItem.image.asset.fixed.src}
                    className="event-fragments__image"
                  />
                </div>
                <div className="event-fragments__title">{newsItem.title}</div>
                <div className="event-fragments__type"></div>
                <div className="event-fragments__location">
                  <span className="event-fragments__date">
                    {newsItem._updatedAt}
                  </span>
                </div>
              </AniLink>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default News
