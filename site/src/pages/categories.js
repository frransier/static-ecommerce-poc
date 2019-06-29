import React from "react"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { mapEdgesToNodes } from "../helpers/helpers"

export const query = graphql`
  {
    categories: allSanityCategory {
      edges {
        node {
          slug {
            current
          }
          id
          title
        }
      }
    }
  }
`
const CategoriesPage = props => {
  const { data } = props

  const categoryNodes = mapEdgesToNodes(data.categories)

  return (
    <Layout>
      <SEO title="Categories" />
      <AniLink fade to="/" duration={0.5}>
        Back
      </AniLink>
      <ul>
        {categoryNodes.map(category => (
          <li key={category.id}>
            <AniLink fade to={`/${category.slug.current}/`} duration={0.5}>
              {category.title}
            </AniLink>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default CategoriesPage
