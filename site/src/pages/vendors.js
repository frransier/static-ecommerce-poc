import React from "react"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { mapEdgesToNodes } from "../helpers/helpers"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"

export const query = graphql`
  query VendorsQuery {
    vendors: allSanityVendor {
      edges {
        node {
          title
          logo {
            asset {
              fixed(height: 80, width: 480) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }
  }
`

const VendorsPage = props => {
  const vendors = mapEdgesToNodes(props.data.vendors)

  return (
    <Layout>
      <SEO title="Vendors" />
      <AniLink fade to="/" duration={0.01}>
        Back
      </AniLink>
      <h1>Our top quality vendors</h1>
      {vendors.map(v => {
        return (
          <div key={v.title}>
            <div>
              <h3>{v.title}</h3>
              <Image fixed={v.logo.asset.fixed} />
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default VendorsPage
