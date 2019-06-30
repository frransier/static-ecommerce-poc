import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi Wipcore</h1>
    <p>This is our new serverless ecommerce poc</p>
    <AniLink paintDrip to="/products/" color="rebeccapurple" duration={0.3}>
      Look at our tasty products
    </AniLink>
    <br />
    <AniLink fade to="/categories" duration={0.3}>
      Check out our awesome product categories
    </AniLink>
    <br />
    <AniLink fade to="/vendors/" duration={0.3}>
      See our top quality vendors
    </AniLink>
    <br />
    <AniLink fade to="/contact/" duration={0.3}>
      Contact us
    </AniLink>
  </Layout>
)

export default IndexPage
