import React from "react"
import PrismCodeBlock from "@theme-ui/prism"

import css from "@emotion/css"

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
}
