import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"
import Youtube from "../components/youtube"

import Hero from "../components/hero"
import Card from "../components/card"

export const query = graphql`
  query StoryQuery($id: String!) {
    story: sanityStory(id: { eq: $id }) {
      _type
      title
      image {
        asset {
          fixed(width: 2100) {
            src
          }
        }
      }
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawBody(resolveReferences: { maxDepth: 10 })
      products {
        title
        mainImage {
          asset {
            fixed {
              src
            }
          }
        }
      }
      stories {
        _type
        title
        slug {
          current
        }
        image {
          asset {
            fixed(width: 600) {
              src
            }
          }
        }
      }
    }
  }
`

const StoryTemplate = props => {
  const { data } = props
  const story = data && data.story

  const serializers = {
    types: {
      youtube: props => <Youtube value={props.node}></Youtube>,
    },
  }

  return (
    <Layout>
      <SEO title={story.title} />
      <Hero data={story} hideIntro />
      <section className="section section--padding-y-xl">
        <div className="wysiwyg-content">
          <h1>{story.title}</h1>
          <BlockContent blocks={story._rawIntro} serializers={serializers} />
          <BlockContent blocks={story._rawBody} serializers={serializers} />
        </div>
      </section>
      <section className="section section--no-x-padding-xs">
        <div className="grid grid--no-gutter-xs grid--col-xs-1">
          <div className="grid__item grid__item--12"></div>
          {story.stories.map((storyItem, index) => (
            <div key={index} className="grid__item grid__item--6">
              <Card data={storyItem} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default StoryTemplate
