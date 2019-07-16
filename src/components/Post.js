import React from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"
import Seo from "./Seo"
import Layout from "./Layout"
import css from "@emotion/css"
import { useTheme, withTheme } from "../helpers/theme"
import styled from "@emotion/styled"
import PostMeta from "./PostMeta"
import NextPrev from "./NextPrev"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { AVATAR_QUERY } from "./Header"

const Article = withTheme(styled.article`
  margin: 0 auto;
  max-width: 700px;
  h1,
  h2,
  h3 {
    margin-bottom: 0.5rem;
  }
  .gatsby-resp-image-image {
    border: 0;
    display: block;
    border-radius: ${theme => theme.size.radius.default};
    overflow: hidden;
    border: 1px solid ${theme => theme.line.color};
    position: absolute;
    top: 0;
  }
`)

const Author = withTheme(styled.div`
  margin: ${theme => theme.space.l} 0;
  padding: ${theme => theme.space.l} 0;
  border-top: 1px solid ${theme => theme.line.color};
  border-bottom: 1px solid ${theme => theme.line.color};
  .avatar {
    float: left;
    border-radius: 65% 75%;
    border: 1px solid ${theme => theme.line.color};
    display: inline-block;
    height: 50px;
    margin: 5px 20px 0 0;
    overflow: hidden;
    width: 50px;
  }
  .avatar img {
    width: 100%;
  }
  .note {
    font-size: 0.9em;
    line-height: 1.6;
  }
`)
const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => {
  const theme = useTheme()
  return (
    <Layout content>
      <Seo title={post.title} description={post.excerpt} />
      <Article>
        <h1
          css={css`
            font-size: ${`calc(${theme.font.size.xl} * 1.4)`};
            margin: ${theme.space.stack.l};
          `}
        >
          {post.title}
        </h1>
        <PostMeta {...post} />
        <MDXRenderer>{post.body}</MDXRenderer>
        <footer>
          <Author>
            <div className="avatar">
              <StaticQuery
                query={AVATAR_QUERY}
                render={data => <Img fluid={data.file.childImageSharp.fluid} />}
              />{" "}
            </div>
            <div className="note">
              <strong>Alex Anderson</strong> is a husband, React web developer,
              Latter-day Saint, amateur rock climber, hobby chef, and spaceship
              enthusiast. He enjoys learning new things, teaching inspiring
              things, building cool things, and doing fun things.
            </div>
          </Author>
          <NextPrev next={next} prev={previous} />
        </footer>
      </Article>
    </Layout>
  )
}

export default Post
