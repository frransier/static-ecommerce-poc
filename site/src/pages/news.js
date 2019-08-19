import React, { useState } from "react"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link"

import { mapEdgesToNodes } from "../helpers/helpers"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"

export const query = graphql`
  {
    news: allSanityNews {
      edges {
        node {
          _type
          title
          image {
            asset {
              fixed(width: 2100) {
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
      <Hero data={newsNodes[0]} hidePreHeading secondary />
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
                    alt=""
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
