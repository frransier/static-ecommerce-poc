import React from "react"
import { createHistory, Location } from "@reach/router"
import queryString from "query-string"

const history = typeof window !== "undefined" ? createHistory(window) : "bajjs"

const withLocation = ComponentToWrap => props => {
  if (typeof window !== "undefined") {
    return (
      <Location>
        {({ location, navigate }) => (
          <ComponentToWrap
            {...props}
            location={location}
            navigate={navigate}
            search={location.search ? queryString.parse(location.search) : {}}
            history={history}
          />
        )}
      </Location>
    )
  }
  return <ComponentToWrap></ComponentToWrap>
}

export default withLocation
