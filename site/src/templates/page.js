import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Modules from "../components/modules"
import BlockContent from "@sanity/block-content-to-react"

export const query = graphql`
  query pageQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      title
      _rawRichText(resolveReferences: { maxDepth: 10 })
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
      <BlockContent blocks={page._rawRichText} />
    </Layout>
  )
}

export default PageTemplate
