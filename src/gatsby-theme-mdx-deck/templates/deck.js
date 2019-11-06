import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Deck from "gatsby-theme-mdx-deck/src/components/deck"
import splitSlides from "gatsby-theme-mdx-deck/src/split-slides"
import css from "@emotion/css"
import { Global } from "@emotion/core"

export const pageQuery = graphql`
  query($id: String!) {
    deck: deck(id: { eq: $id }) {
      id
      body
    }
  }
`

const wrapper = props => {
  const slides = splitSlides(props)
  return (
    <div
      css={css`
        h1 {
          font-size: 4rem;
        }
        h2 {
          font-size: 2.75rem;
        }
        h3 {
          font-size: 2.25rem;
        }
        h4,
        h5,
        h6 {
          font-size: 2rem;
        }
        p,
        li,
        pre {
          font-size: 2rem;
        }
        img {
          max-height: 90vh;
        }
        video {
          max-height: 90vh;
        }
        blockquote {
          max-width: 50vw;
        }
        cite {
          font-size: 1.2rem;
        }
      `}
    >
      <Global
        styles={css`
          .gatsby-resp-image-background-image {
            padding-bottom: 0 !important;
          }
        `}
      ></Global>
      <Deck {...props} slides={slides} />
    </div>
  )
}

const components = {
  wrapper,
}

export default ({
  data: {
    deck: { id, body },
  },
  ...props
}) => {
  const Component = props => <MDXRenderer {...props} children={body} />
  return <Component {...props} components={components} />
}
