import React, { useEffect, useState } from "react"

import { mapEdgesToNodes } from "../helpers/helpers"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card"
import Hero from "../components/hero"
import ProductList from "../components/productList"

export const query = graphql`
  {
    stories: allSanityStory {
      edges {
        node {
          _type
          title
          image {
            asset {
              fixed(width: 2100) {
                src
              }
            }
          }
          slug {
            current
          }
          _updatedAt(formatString: "YYYY-MM-DD")
        }
      }
    }
    news: allSanityNews {
      edges {
        node {
          _type
          title
          image {
            asset {
              fixed(width: 2100) {
                src
              }
            }
          }
          slug {
            current
          }
          _updatedAt(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`

const IndexPage = (props, { hits }) => {
  const { data } = props
  const storyNodes = mapEdgesToNodes(data.stories)
  const newsNodes = mapEdgesToNodes(data.news)
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])
  return (
    <Layout headerIsTransparent>
      <Hero data={storyNodes[1]} />
      <section className="section">
        <h2>Senaste reportagen</h2>
        <div className="grid grid--no-gutter-xs grid--col-xs-1">
          <div className="grid__item grid__item--12"></div>
          {storyNodes.map((storyItem, index) => (
            <div key={index} className="grid__item grid__item--6">
              <Card data={storyItem} />
            </div>
          ))}
        </div>
      </section>
      {didMount && <ProductList showCase />}
      <section className="section">
        <h2>Senaste nytt hos Jaktia</h2>
        <div className="grid grid--no-gutter-xs grid--col-xs-1">
          <div className="grid__item grid__item--12"></div>
          {newsNodes.map((newsItem, index) => (
            <div key={index} className="grid__item grid__item--6">
              <Card data={newsItem} />
            </div>
          ))}
        </div>
      </section>
      {didMount && <ProductList showCase />}
    </Layout>
  )
}

export default IndexPage
