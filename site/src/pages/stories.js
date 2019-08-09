import React, { useState } from "react"
import { graphql } from "gatsby"

import { mapEdgesToNodes } from "../helpers/helpers"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import Hero from "../components/hero"

export const query = graphql`
  {
    stories: allSanityStory {
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

const Stories = props => {
  const { data } = props
  const storyNodes = mapEdgesToNodes(data.stories)
  const [sortValue, setSortValue] = useState("asc")

  const sortStories = () => {
    if (sortValue === "asc") {
      return (a, b) => (a._updatedAt < b._updatedAt ? -1 : 1)
    } else if (sortValue === "desc") {
      return (a, b) => (a._updatedAt > b._updatedAt ? -1 : 1)
    }
  }

  return (
    <Layout>
      <SEO title="Notiser" />
      <Hero data={storyNodes[0]} />
      <section className="section section--padding-bottom-xl">
        <div className="content-filter">
          <div className="content-filter__filters">
            <select
              value={sortValue}
              onChange={story => setSortValue(story.target.value)}
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
        <section className="section section--no-x-padding-xs">
          <div className="grid grid--no-gutter-xs grid--col-xs-1">
            <div className="grid__item grid__item--12"></div>
            {storyNodes.sort(sortStories()).map((storyItem, index) => (
              <div key={index} className="grid__item grid__item--6">
                <Card data={storyItem} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  )
}

export default Stories
