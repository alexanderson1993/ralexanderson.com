import React from "react"
import { Global, css } from "@emotion/core"
import { useThemeUI } from "theme-ui"

const GlobalStyles = () => {
  const { theme } = useThemeUI()
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
          font-family: ${theme.fonts.heading};
          transition: all 0.5s ease;
        }
        a {
          text-decoration: none;
        }
        p {
          margin: 0;
        }
      `}
    />
  )
}

export default GlobalStyles
