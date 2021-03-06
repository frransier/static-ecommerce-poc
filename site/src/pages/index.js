import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const IndexPage = () => (
  <Layout>
    <section className="section">
      <SEO title="Home" />
      <h1>Hi</h1>
      <p>This is a static ecommerce poc</p>
      <AniLink fade to="/products/" duration={0.6}>
        Look at our tasty products
      </AniLink>
      <br />
      <AniLink fade to="/categories" duration={0.6}>
        Check out our awesome product categories
      </AniLink>
      <br />
      <AniLink fade to="/vendors/" duration={0.6}>
        See our top quality vendors
      </AniLink>
      <br />
      <AniLink fade to="/contact/" duration={0.6}>
        Contact us
      </AniLink>
    </section>
    <section className="section">
      The SNAG stack: {` `}
      <a href="https://www.sanity.io">Sanity</a>,{` `}
      <a href="https://www.netlify.com">Netlify</a>,{` `}
      <a href="https://www.algolia.com">Algolia</a>,{` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>,{` `}
      {` `}
    </section>
  </Layout>
)

export default IndexPage
