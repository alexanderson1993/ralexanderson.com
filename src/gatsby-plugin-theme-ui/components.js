import React from "react"
import PrismCodeBlock from "@theme-ui/prism"

import headings from "../components/headings"
import css from "@emotion/css"
import Img from "gatsby-image"

export default {
  pre: ({ children }) => <>{children}</>,
  code: PrismCodeBlock,
  iframe: props => (
    <iframe
      title={props.title || "Embed"}
      {...props}
      css={css`
        width: 100%;
      `}
    />
  ),
  ...headings,
}
