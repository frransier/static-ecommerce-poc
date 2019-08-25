import React from "react"

function Text({ content }) {
  const style = {
    paddingLeft: "60px",
    paddingRight: "60px",
  }

  return <p style={style}>{content.text}</p>
}

export default Text
