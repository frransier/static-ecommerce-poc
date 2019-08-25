import React from "react"
import BlockContent from "@sanity/block-content-to-react"

function Rte({ content }) {
  const serializers = {
    types: {
      youtube: props => <Youtube value={props.node} />,
    },
  }
  return (
    <BlockContent
      blocks={content._rawModules}
      serializers={serializers}
    ></BlockContent>
  )
}

export default Rte
