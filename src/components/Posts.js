import PropTypes from "prop-types"
import React from "react"

import Item from "./PostItem"
import Layout from "./Layout"
import { Styled, css } from "theme-ui"

const Blog = props => {
  const { posts } = props
  return (
    <Layout {...props} content>
      <Styled.ul
        css={css({
          listStyle: "none",
          margin: "0 auto",
          padding: 2,
          maxWidth: "800px",
        })}
      >
        {posts.map(post => {
          const {
            node,
            node: { slug },
          } = post
          return <Item key={slug} post={node} />
        })}
      </Styled.ul>
    </Layout>
  )
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default Blog
