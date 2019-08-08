import React from "react"
import { graphql } from "gatsby"

import { mapEdgesToNodes } from "../helpers/helpers"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  {
    news: allSanityNews {
      edges {
        node {
          title
        }
      }
    }
  }
`

const News = props => {
  const { data } = props
  const newsNodes = mapEdgesToNodes(data.news)

  return (
    <Layout>
      <SEO title="Notiser" />
      {newsNodes.map(newsItem => (
        <div>{newsItem.title}</div>
      ))}
    </Layout>
  )
}

export default News
