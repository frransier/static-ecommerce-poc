import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi Wipcore</h1>
    <p>This is our new serverless ecommerce poc</p>
    <Link to="/products/">Look at our tasty products</Link>
  </Layout>
)

export default IndexPage
