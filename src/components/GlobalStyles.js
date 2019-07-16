import React from "react"
import { useTheme } from "../helpers/theme"
import { Global, css } from "@emotion/core"

const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        html {
          box-sizing: border-box;
        }
        *,
        *:after,
        *:before {
          box-sizing: inherit;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: ${theme.font.family.target};
        }
        h1,
        h2,
        h3 {
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
        }
        h1 {
          letter-spacing: -0.04em;
        }
        p {
          margin: 0;
        }
        strong {
          font-weight: 600;
        }
        a {
          text-decoration: none;
          color: #666;
        }
        main {
          width: auto;
          display: block;
        }
      `}
    />
  )
}

export default GlobalStyles
