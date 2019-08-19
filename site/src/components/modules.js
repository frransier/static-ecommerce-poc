import React from "react"
import Hero from "./modules/hero"
import HeroColor from "./modules/hero-color"
import News from "./modules/news"
import Products from "./modules/products"
import Stories from "./modules/stories"
import Brands from "./modules/brands"

const Modules = props => {
  const { type, module } = props

  switch (type) {
    case "hero":
      return <Hero content={module} />
    case "heroColor":
      return <HeroColor content={module} />
    case "news-module":
      return <News content={module} />
    case "products":
      return <Products content={module} />
    case "stories":
      return <Stories content={module} />
    case "vendors":
      return <Brands content={module} />
    default:
      return null
  }
}

export default Modules
