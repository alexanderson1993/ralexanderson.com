import React from "react"
import { Link } from "gatsby"

import { FaArrowRight } from "react-icons/fa/"
import { FaArrowLeft } from "react-icons/fa/"
import styled from "@emotion/styled"
import { withTheme } from "../helpers/theme"

const Links = withTheme(styled.div`
  display: flex;
  padding: 0 ${theme => theme.space.m} ${theme => theme.space.l};
  border-bottom: 1px solid ${theme => theme.line.color};
  margin: ${theme => theme.space.stack.l};
  flex-direction: row-reverse;
  justify-content: center;
  h4 {
    font-weight: 600;
    margin: 0;
    font-size: 1.1em;
  }
  a {
    display: flex;

    flex-basis: 50%;
  }
  a:nth-child(2) {
    margin: 0;
  }
  a:hover svg {
    transform: scale(1.5);
  }

  svg {
    fill: ${theme => theme.color.special.attention};
    width: ${theme => theme.space.m};
    height: ${theme => theme.space.m};
    flex-shrink: 0;
    flex-grow: 0;
    margin: ${theme => theme.space.inline.m};
    transition: all 0.5s;
    margin: ${theme => theme.space.inline.s};
  }
`)

const Time = withTheme(styled.time`
  color: ${theme => theme.color.neutral.gray.g};
  display: block;
  font-weight: 400;
  font-size: 0.8em;
  margin-top: 0.5em;
`)

const NextPrev = props => {
  const { next = {}, prev = {} } = props
  const { title: nextTitle, slug: nextSlug, date: nextDate } = next
    ? next.node
    : {}
  const { title: prevTitle, slug: prevSlug, date: prevDate } = prev
    ? prev.node
    : {}
  console.log(nextTitle, nextSlug, nextDate)
  return (
    <Links>
      {nextSlug && (
        <Link to={nextSlug}>
          <FaArrowRight />
          <h4>
            {nextTitle} <Time>{nextDate}</Time>
          </h4>
        </Link>
      )}
      {prevSlug && (
        <Link to={prevSlug}>
          <FaArrowLeft />
          <h4>
            {prevTitle} <Time>{prevDate}</Time>
          </h4>
        </Link>
      )}
    </Links>
  )
  // return (
  //   <React.Fragment>
  //

  //     {/* --- STYLES --- */}
  //     <style jsx>{`
  //       .links {

  //         :global(a) {
  //         }

  //         :global(a:nth-child(2)) {
  //           margin: ${theme.space.default} 0 0;
  //         }

  //         :global(svg) {

  //         }
  //       }

  //       h4 {

  //       }
  //       time {

  //       }

  //       @from-width desktop {
  //         .links {

  //           :global(a) {
  //           }

  //           :global(svg) {

  //           }
  //         }

  //         @media (hover: hover) {
  //
  //         }
  //       }
  //     `}</style>
  //   </React.Fragment>
  // );
}

export default NextPrev
