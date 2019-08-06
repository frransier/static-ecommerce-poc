import React from "react"
import { createHistory, Location } from "@reach/router"
import queryString from "query-string"

const history = createHistory(window)

const withLocation = ComponentToWrap => props => (
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

export default withLocation
