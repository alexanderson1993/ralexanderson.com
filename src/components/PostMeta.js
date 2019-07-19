import React from "react"

import { FaCalendar } from "react-icons/fa/"
import { FaTag } from "react-icons/fa/"
import { FaUser } from "react-icons/fa/"
import styled from "@emotion/styled"
import { css } from "theme-ui"

const IconHolder = ({ children }) => {
  return (
    <span
      css={css({
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase",
        margin: 2,
      })}
    >
      {children}
    </span>
  )
}
const Meta = styled.p`
  line-height: 1.5;
  text-remove-gap: both;
  display: flex;
  flex-flow: row wrap;
  font-size: 0.8em;

  background: transparent;
`

const PostMeta = ({ className, date, author, category }) => {
  return (
    <Meta className={className}>
      {date && (
        <IconHolder>
          <FaCalendar size={18} /> {date}
        </IconHolder>
      )}
      {author && (
        <IconHolder>
          <FaUser size={18} /> {author}
        </IconHolder>
      )}
      {category && (
        <IconHolder>
          <FaTag size={18} /> {category}
        </IconHolder>
      )}
    </Meta>
  )
}
export default PostMeta
