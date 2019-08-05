/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { LayoutStore } from "./src/context/LayoutStore"

export const wrapRootElement = ({ element }) => (
  <LayoutStore>{element}</LayoutStore>
)
