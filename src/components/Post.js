import React from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"
import Seo from "./Seo"
import Layout from "./Layout"
import PostMeta from "./PostMeta"
import NextPrev from "./NextPrev"
import { StaticQuery } from "gatsby"
import Img from "gatsby-image"
import { AVATAR_QUERY } from "./Header"
import { useThemeUI, Styled, css as themeCss } from "theme-ui"
import css from "@emotion/css"

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
  const { theme, ...rest } = useThemeUI()
  console.log(rest)
  return (
    <Layout content>
      <Seo title={post.title} description={post.excerpt} />
      <article
        css={css`
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
            border-radius: 10;
            overflow: hidden;
            border: 1px solid ${theme.colors.muted};
            position: absolute;
            top: 0;
          }
        `}
      >
        <h1
          css={themeCss({
            my: 3,
          })}
        >
          {post.title}
        </h1>
        <PostMeta {...post} />
        <MDXRenderer>{post.body}</MDXRenderer>
        <footer>
          <Styled.div
            css={themeCss({
              my: 3,
              py: 3,
              borderTop: "1px solid",
              borderBottom: " 1px solid",
              borderTopColor: "muted",
              borderBottomColor: "muted",
            })}
          >
            <div
              css={css`
                border-radius: 65% 75%;
                border: 1px solid ${theme.colors.muted};
                display: inline-block;
                height: 50px;
                margin: 5px 20px 0 0;
                overflow: hidden;
                width: 50px;
                img {
                  width: 100%;
                }
              `}
            >
              <StaticQuery
                query={AVATAR_QUERY}
                render={data => <Img fluid={data.file.childImageSharp.fluid} />}
              />{" "}
            </div>
            <div
              css={css`
                font-size: 0.9em;
                line-height: 1.6;
              `}
            >
              <strong>Alex Anderson</strong> is a husband, React web developer,
              Latter-day Saint, amateur rock climber, hobby chef, and spaceship
              enthusiast. He enjoys learning new things, teaching inspiring
              things, building cool things, and doing fun things.
            </div>
          </Styled.div>
          <NextPrev next={next} prev={previous} />
        </footer>
      </article>
    </Layout>
  )
}

export default Post
