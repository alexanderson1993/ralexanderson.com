import { FaArrowRight } from "react-icons/fa/"

import Img from "gatsby-image"
import { Link } from "gatsby"
import React from "react"
import PostMeta from "./PostMeta"
import css from "@emotion/css"
import { css as themeCss, Styled, useThemeUI } from "theme-ui"

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
        margin-bottom: ${theme.space[5]}px;
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
