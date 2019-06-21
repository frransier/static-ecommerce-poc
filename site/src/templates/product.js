import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"

export const query = graphql`
  query ProductQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      title
    }
  }
`

const ProductTemplate = props => {
  const { data } = props
  const product = data && data.product

  return (
    <Layout>
      {product && <SEO title={product.title} />}
      {product && <div>{product.title}</div>}
    </Layout>
  )
}

export default ProductTemplate
