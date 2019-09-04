import React from "react"
import { graphql } from "gatsby"

import Post from "../components/Post"

export default ({
  pageContext: { previous, next, imagePaths },
  location,
  data,
}) => (
  <Post
    data={data}
    location={location}
    previous={previous}
    next={next}
    imagePaths={imagePaths}
  />
)

export const pageQuery = graphql`
  query($id: String!) {
    post: blogPost(id: { eq: $id }) {
      id
      title
      date(formatString: "MMMM DD, YYYY")
      excerpt
      body
      author
      category
      subtext
    }
    site: site {
      siteMetadata {
        title
      }
    }
  }
`
