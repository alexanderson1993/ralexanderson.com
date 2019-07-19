import { FaArrowRight } from "react-icons/fa/"

import Img from "gatsby-image"
import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled"
import PostMeta from "./PostMeta"
import css from "@emotion/css"
import { css as themeCss, Styled, useThemeUI } from "theme-ui"

// const PostItem = styled.li`
//   border: 1px solid transparent;
//   border-radius: ${theme => theme.size.radius.default};
//   position: relative;
//   background: transparent;

//   margin: ${theme =>
//     `calc(${theme.space.default} * 4) 0 calc(${theme.space.default} * 5)`};
//   padding: 0 0 ${theme => `calc(${theme.space.default} * 2)`};

//   .gatsby-image-outer-wrapper {
//     border-radius: ${theme => theme.size.radius.default};
//     border: 1px solid ${theme => theme.line.color};
//     overflow: hidden;
//   }
//   .gatsby-image-outer-wrapper img {
//     z-index: -1;
//   }
//   a {
//     color: ${theme => theme.text.color.primary};
//   }

//   .gatsby-image-wrapper {
//     transition: all ${theme => theme.time.duration.default};
//   }

//   h1 {
//     padding: ${theme => theme.space.m} ${theme => theme.space.s} 0;
//     line-height: ${theme => theme.blog.h1.lineHeight};
//     text-remove-gap: both;
//     font-size: 2.5em;
//     padding: ${theme =>
//       `calc(${theme.space.default} * 1.2) calc(${theme.space.default} * 2) 0`};
//   }
// `

const Item = props => {
  const {
    post: { date, title, excerpt, slug, author, cover, category },
  } = props
  const {
    children: [img],
  } = cover || { children: [] }
  const { fluid } = img || {}
  const { theme } = useThemeUI()
  return (
    <Styled.li
      css={css`
        transition: all 0.5s;
        margin: ${theme.space[5]}px 0;
        .gatsby-image-wrapper {
          transition: all 0.5s;
        }
        border-radius: 10px;
        border: 1px solid transparent;

        .arrow {
          padding-top: 10px;
          display: inline-block;
          fill: ${theme.secondary};
          stroke: ${theme.secondary};
          stroke-width: 40;
          stroke-linecap: round;
          opacity: 0;
          transition: all 0.5s;
          transform: translateX(-50%);
        }

        &:hover {
          border-color: ${theme.colors.muted};
          box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);

          .gatsby-image-wrapper {
            transform: scale(1.1);
          }
          .arrow {
            opacity: 1;
            stroke: ${theme.colors.secondary};
            transform: translateX(0);
          }
        }
      `}
    >
      <Link
        to={`${slug}`}
        key={slug}
        className="link"
        css={themeCss({
          color: "text",
        })}
      >
        {fluid && (
          <Styled.div
            css={themeCss({
              borderColor: "muted",
              overflow: "hidden",
              borderRadius: 10,
            })}
          >
            <Img fluid={fluid} />
          </Styled.div>
        )}
        <h1
          css={themeCss({
            px: 3,
            py: 1,
          })}
        >
          {title} <FaArrowRight className="arrow" />
        </h1>
        <PostMeta
          css={themeCss({
            px: 3,
            py: 1,
          })}
          date={date}
          author={author}
          category={category}
        />
        <Styled.div
          css={themeCss({
            px: 3,
            py: 1,
          })}
        >
          {excerpt}
        </Styled.div>
      </Link>
    </Styled.li>
  )
}

export default Item
