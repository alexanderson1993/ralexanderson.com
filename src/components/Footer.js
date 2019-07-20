import React from "react"
import { css, Footer } from "theme-ui"
import styled from "@emotion/styled"

const List = styled.ul`
  list-style: none;
  text-align: center;
  padding: 0;
  width: 100%;

  li:last-child::after {
    content: "";
  }
`
const FooterComp = () => {
  return (
    <Footer>
      <List>
        <li css={css({ variant: "footer.listItem" })}>
          built with ♡ by <em>Alex Anderson</em>
        </li>
        <li css={css({ variant: "footer.listItem" })}>
          created with{" "}
          <a
            href="https://www.gatsbyjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
        </li>
        <li css={css({ variant: "footer.listItem" })}>
          delivered by{" "}
          <a
            href="https://www.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
        </li>
        <li css={css({ variant: "footer.listItem" })}>
          photos by{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            unsplash.com
          </a>
        </li>
      </List>
    </Footer>
  )
}

export default FooterComp
