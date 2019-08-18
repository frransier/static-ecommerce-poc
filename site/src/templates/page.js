import React from "react"
import { graphql } from "gatsby"

const query = graphql`
  query pageQuery($id: String!) {
    news: sanityPage(id: { eq: $id }) {
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
