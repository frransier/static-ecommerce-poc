import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export const query = graphql`
  query StoryQuery($id: String!) {
    story: sanityStory(id: { eq: $id }) {
      title
      hero {
        asset {
          fixed {
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
        title
        hero {
          asset {
            fixed {
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

  return (
    <Layout>
      <SEO title={story.title} />
      <AniLink to="/" fade duration={0.3}>
        Back
      </AniLink>
      <h1>{story.title}</h1>
      <pre>{JSON.stringify(story, null, 2)}</pre>
      <pre>{JSON.stringify(story.products, null, 2)}</pre>
      <pre>{JSON.stringify(story.stories, null, 2)}</pre>
    </Layout>
  )
}

export default StoryTemplate
