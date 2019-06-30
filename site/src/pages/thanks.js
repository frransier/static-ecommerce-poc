import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ThanksPage = () => (
  <Layout>
    <SEO title="Thank you" />
    <h1>Thanks</h1>
    <p>for contacting us</p>
    <AniLink fade to="/" duration={0.3}>
      Back to start page
    </AniLink>
  </Layout>
)

export default ThanksPage
