import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { mapEdgesToNodes } from "../helpers/helpers"

export const query = graphql`
  {
    categories: allSanityCategory(filter: { slug: { current: { ne: null } } }) {
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
      <Link to="/">Back</Link>
      <ul>
        {categoryNodes.map(category => (
          <li key={category.id}>
            <Link to={`/${category.slug.current}/`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default CategoriesPage
