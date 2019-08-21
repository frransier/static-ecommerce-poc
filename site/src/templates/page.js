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
        ... on SanityCategories {
          _key
          _type
          categories {
            title
            description
          }
        }
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
        ... on SanityHeroColor {
          _key
          _type
          header
          body
          bgColor {
            value
          }
        }
        ... on SanityNewsModule {
          _key
          _type
          news {
            title
            tags
            image {
              asset {
                fixed {
                  src
                }
              }
            }
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
        ... on SanityStories {
          _key
          _type
          stories {
            title
            image {
              asset {
                fixed {
                  src
                }
              }
            }
          }
        }
        ... on SanityVendors {
          _key
          _type
          brands {
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
`
const PageTemplate = props => {
  const { data } = props
  const page = data && data.page

  return (
    <Layout>
      <SEO title={page.title} />
      <h1>{page.title}</h1>
      <h3>Modules:</h3>

      {page.modules &&
        page.modules.map(m => (
          <Modules key={m._key} type={m._type} module={m}></Modules>
        ))}

      <h3>Rich text:</h3>
      <BlockContent blocks={page._rawRichText} />
    </Layout>
  )
}

export default PageTemplate
