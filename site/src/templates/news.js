import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Youtube from "../components/youtube"

export const query = graphql`
  query newsQuery($id: String!) {
    news: sanityNews(id: { eq: $id }) {
      title
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`

const NewsTemplate = props => {
  const { data } = props
  const news = data && data.news
  const serializers = {
    types: {
      youtube: props => <Youtube value={props.node} />,
    },
  }

  return (
    <Layout>
      <SEO title={news.title} />
      <AniLink to="/" fade duration={0.3}>
        Back
      </AniLink>
      <h1>{news.title}</h1>
      <BlockContent
        blocks={news._rawBody}
        serializers={serializers}
      ></BlockContent>
      <pre>{JSON.stringify(news, null, 2)}</pre>
    </Layout>
  )
}

export default NewsTemplate
