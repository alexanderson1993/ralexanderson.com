import PropTypes from "prop-types"
import React from "react"
import styled from "@emotion/styled"
import { withTheme } from "../helpers/theme"

import Item from "./PostItem"
import Layout from "./Layout"
const PostList = withTheme(styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: ${theme =>
    `calc(${theme.space.default} * 1.5) 0 calc(${theme.space.default} * 0.5)`};
  max-width: ${theme => theme.text.maxWidth.desktop};
`)

const Blog = props => {
  const { posts } = props
  return (
    <Layout {...props} content>
      <PostList>
        {posts.map(post => {
          const {
            node,
            node: { slug },
          } = post
          return <Item key={slug} post={node} />
        })}
      </PostList>
    </Layout>
  )
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default Blog
