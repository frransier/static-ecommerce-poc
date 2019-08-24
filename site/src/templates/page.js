import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Modules from "../components/modules"

export const query = graphql`
  query pageQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      title
      modules {
        ... on SanityHero {
          _key
          _type
          title
          body
          link {
            caption
            url
            _type
            _key
          }
          image {
            asset {
              fixed {
                src
              }
            }
            _key
            _type
          }
        }

        ... on SanityParagraph {
          _key
          _type
          text
        }
        ... on SanityProducts {
          _key
          _type
          products {
            title
            id
            slug {
              current
            }
            mainImage {
              asset {
                fixed {
                  ...GatsbySanityImageFixed
                }
              }
            }
            vendor {
              title
              logo {
                asset {
                  fixed {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
const PageTemplate = props => {
  const { data } = props
  const page = data && data.page

  return (
    <Layout>
      <SEO title={page.title} />
      {page.modules &&
        page.modules.map(m => (
          <Modules key={m._key} type={m._type} module={m}></Modules>
        ))}
    </Layout>
  )
}

export default PageTemplate
