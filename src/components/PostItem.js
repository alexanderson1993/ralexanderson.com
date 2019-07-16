import { FaArrowRight } from "react-icons/fa/"

import Img from "gatsby-image"
import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled"
import { withTheme, useTheme } from "../helpers/theme"
import PostMeta from "./PostMeta"
import css from "@emotion/css"

const PostItem = styled.li`
  border: 1px solid transparent;
  border-radius: ${theme => theme.size.radius.default};
  position: relative;
  transition: all ${theme => theme.time.duration.default};
  background: transparent;

  margin: ${theme =>
    `calc(${theme.space.default} * 4) 0 calc(${theme.space.default} * 5)`};
  padding: 0 0 ${theme => `calc(${theme.space.default} * 2)`};

  .gatsby-image-outer-wrapper {
    border-radius: ${theme => theme.size.radius.default};
    border: 1px solid ${theme => theme.line.color};
    overflow: hidden;
  }
  .gatsby-image-outer-wrapper img {
    z-index: -1;
  }
  a {
    color: ${theme => theme.text.color.primary};
  }

  &:hover {
    border: 1px solid ${theme => theme.line.color};
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);

    &:after {
      bottom: ${theme => `calc(${theme.space.default} * -2.5)`};
    }
    .gatsby-image-wrapper {
      transform: scale(1.1);
    }
    h1 {
      color: ${theme => theme.blog.h1.hoverColor};
    }
    .arrow {
      opacity: 1;
      stroke: ${theme => theme.color.special.attention};
      transform: translateX(0);
    }
  }

  .gatsby-image-wrapper {
    transition: all ${theme => theme.time.duration.default};
  }
  .arrow {
    display: inline-block;
    fill: ${theme => theme.color.special.attention};
    stroke: ${theme => theme.color.special.attention};
    stroke-width: 40;
    stroke-linecap: round;
    opacity: 0;
    transition: all 0.5s;
    transform: translateX(-50%);
  }

  &::after {
    border-top: 1px solid ${theme => theme.line.color};
    content: "";
    height: 0;
    position: absolute;
    bottom: ${theme => `calc(${theme.space.default} * -1.5)`};
    left: 50%;
    transform: translateX(-50%);
    transition: all ${theme => theme.time.duration.default};
    width: 50%;
  }

  &:first-child {
    &::before {
      border-top: 1px solid ${theme => theme.line.color};
      content: "";
      height: 0;
      position: absolute;
      top: ${theme => `calc(${theme.space.default} * -2.75)`};
      left: 50%;
      transform: translateX(-50%);
      transition: all ${theme => theme.time.duration.default};
      width: 50%;
    }
  }

  h1 {
    padding: ${theme => theme.space.m} ${theme => theme.space.s} 0;
    line-height: ${theme => theme.blog.h1.lineHeight};
    text-remove-gap: both;
    font-size: 2.5em;
    padding: ${theme =>
      `calc(${theme.space.default} * 1.2) calc(${theme.space.default} * 2) 0`};
  }
`

const Excerpt = withTheme(styled.p`
  padding: ${theme => `0 calc(${theme.space.default} * 2)`};
  line-height: 1.5;
  text-remove-gap: both;
`)

const ThemedPostItem = withTheme(PostItem)

const Item = props => {
  const {
    post: { date, title, excerpt, slug, author, cover, category },
  } = props
  const {
    children: [img],
  } = cover || { children: [] }
  const { fluid } = img || {}
  const theme = useTheme()
  return (
    <ThemedPostItem>
      <Link to={`${slug}`} key={slug} className="link">
        {fluid && (
          <div className="gatsby-image-outer-wrapper">
            <Img fluid={fluid} />
          </div>
        )}
        <h1>
          {title} <FaArrowRight className="arrow" />
        </h1>
        <PostMeta
          css={css`
            padding: ${`calc(${theme.space.default} * 1.5) calc(${
              theme.space.default
            } * 2)
              calc(${theme.space.default} * 0.5)`};
          `}
          date={date}
          author={author}
          category={category}
        />
        <Excerpt>{excerpt}</Excerpt>
      </Link>
    </ThemedPostItem>
  )
}

export default Item
