import React from "react"
import Color from "./attributes/color"

const Attributes = props => {
  const { type, attribute } = props

  switch (type) {
    case "color":
      return <Color attribute={attribute} />

    default:
      return null
  }
}

export default Attributes
