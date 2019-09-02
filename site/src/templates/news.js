import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Youtube from "../components/youtube"

import Hero from "../components/hero"

export const query = graphql`
  query newsQuery($id: String!) {
    news: sanityNews(id: { eq: $id }) {
      _type
      title
      image {
        asset {
          fixed(width: 2100) {
            src
          }
        }
      }
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
    <Layout headerIsTransparent>
      <SEO title={news.title} />
      <Hero data={news} hideIntro />
      <section className="section section--padding-y-xl">
        <div className="wysiwyg-content">
          <h1>{news.title}</h1>
          <BlockContent
            blocks={news._rawBody}
            serializers={serializers}
          ></BlockContent>
        </div>
      </section>
    </Layout>
  )
}

export default NewsTemplate
