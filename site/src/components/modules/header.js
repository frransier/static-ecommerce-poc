import React from "react"

function Header({ content }) {
  switch (content.header) {
    case "h1":
      return <h1>{content.title}</h1>

    case "h2":
      return <h2>{content.title}</h2>

    case "h3":
      return <h3>{content.title}</h3>

    case "h4":
      return <h4>{content.title}</h4>

    case "h5":
      return <h5>{content.title}</h5>

    default:
      break
  }
}

export default Header
