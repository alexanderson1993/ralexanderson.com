import React from "react"

import { FaCalendar } from "react-icons/fa/"
import { FaTag } from "react-icons/fa/"
import { FaUser } from "react-icons/fa/"
import styled from "@emotion/styled"
import { withTheme } from "../helpers/theme"

const Meta = withTheme(styled.p`
  line-height: 1.5;
  text-remove-gap: both;
  display: flex;
  flex-flow: row wrap;
  font-size: 0.8em;

  background: transparent;

  svg {
    fill: ${theme => theme.icon.color};
    margin: ${theme => theme.space.inline.xs};
  }
  span {
    align-items: center;
    display: flex;
    text-transform: uppercase;
    margin: ${theme => theme.space.xs} ${theme => theme.space.s}
      ${theme => theme.space.xs} 0;
  }
`)

const PostMeta = ({ className, date, author, category }) => {
  return (
    <Meta className={className}>
      {date && (
        <span>
          <FaCalendar size={18} /> {date}
        </span>
      )}
      {author && (
        <span>
          <FaUser size={18} /> {author}
        </span>
      )}
      {category && (
        <span>
          <FaTag size={18} /> {category}
        </span>
      )}
    </Meta>
  )
}
export default PostMeta
