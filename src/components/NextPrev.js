import React from "react"
import { Link } from "gatsby"

import { FaArrowRight } from "react-icons/fa/"
import { FaArrowLeft } from "react-icons/fa/"
import { Styled, css as themeCss } from "theme-ui"

const Time = ({ children }) => {
  return (
    <time
      css={themeCss({
        display: "block",
        fontWeight: "400",
        fontSize: "0.8em",
        marginTop: "0.5em",
        color: "muted",
      })}
    >
      {children}
    </time>
  )
}

const NextPrev = props => {
  const { next = {}, prev = {} } = props
  const { title: nextTitle, slug: nextSlug, date: nextDate } = next
    ? next.node
    : {}
  const { title: prevTitle, slug: prevSlug, date: prevDate } = prev
    ? prev.node
    : {}
  return (
    <Styled.div
      css={themeCss({
        display: "flex",
        px: 2,
        borderBottom: "1px solid",
        borderBottomColor: "muted",
        m: 3,
        flexDirection: "row-reverse",
        justifyContent: "center",
        a: {
          display: "flex",
          mx: 3,
          "&:first-child": {
            textAlign: "right",
          },
        },
      })}
    >
      {nextSlug && (
        <Link to={nextSlug}>
          <Styled.h4 css={themeCss({ px: 2 })}>
            {nextTitle} <Time>{nextDate}</Time>
          </Styled.h4>
          <FaArrowRight />
        </Link>
      )}
      {prevSlug && (
        <Link to={prevSlug}>
          <FaArrowLeft />
          <Styled.h4 css={themeCss({ px: 2 })}>
            {prevTitle} <Time>{prevDate}</Time>
          </Styled.h4>
        </Link>
      )}
    </Styled.div>
  )
}

export default NextPrev
