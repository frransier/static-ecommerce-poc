import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ThanksPage = () => (
  <Layout>
    <SEO title="Thank you" />
    <h1>Thanks</h1>
    <p>for contacting us</p>
    <Link to="/">Back to start page</Link>
  </Layout>
)

export default ThanksPage
