import React from "react"
import getYoutubeId from "get-youtube-id"

const Youtube = ({ value }) => {
  const id = getYoutubeId(value.url)
  const url = `https://www.youtube.com/embed/${id}`

  if (!id) {
    return <div>Missing Youtube url</div>
  }
  return (
    <iframe
      title="Youtube Preview"
      width="750"
      height="315"
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  )
}

export default Youtube
