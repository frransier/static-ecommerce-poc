import React from "react"

function Text({ content }) {
  console.log(content)

  return <p>{content.text}</p>
}

export default Text
