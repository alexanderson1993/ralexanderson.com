import React from "react"
import styled from "@emotion/styled"
import { withTheme } from "../helpers/theme"

const HeroSection = withTheme(styled.section`
  align-items: center;
  background-color: #181520;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%233e3e3e' fill-opacity='0.23' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  color: ${theme => theme.text.color.primary.inverse};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: calc(100vh - 20px);
  height: 100px;
  padding: ${theme => theme.space.inset.l};
  padding-top: ${theme => theme.header.height.homepage};
  h1,
  h2 {
    text-align: center;
    margin: ${theme => theme.space.stack.l};
    color: ${theme => theme.hero.h1.color};
    line-height: ${theme => theme.hero.h1.lineHeight};
  }
  h1 {
    max-width: 80%;
    font-size: ${theme => `calc(${theme.hero.h1.size} * 1.5)`};
  }
  h2 {
    max-width: 80%;
    font-size: ${theme => `calc(${theme.hero.h1.size} * 0.8)`};
  }
  button {
    font-size: ${theme => theme.font.size.xl};
  }
`)

const FollowButtons = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
const Hero = () => {
  React.useEffect(() => {
    if (typeof window === "undefined") return () => {}
    if (!window.twttr) {
      window.twttr = (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {}
        if (d.getElementById(id)) return t
        js = d.createElement(s)
        js.id = id
        js.src = "https://platform.twitter.com/widgets.js"
        fjs.parentNode.insertBefore(js, fjs)

        t._e = []
        t.ready = function(f) {
          t._e.push(f)
        }

        return t
      })(document, "script", "twitter-wjs")
    }
    if (!window.githubButton) {
      ;(function(d, s, id) {
        window.githubButton = true
        if (d.getElementById(id)) return
        const fjs = d.getElementsByTagName(s)[0]
        const js = d.createElement(s)
        js.id = id
        js.src = "https://buttons.github.io/buttons.js"
        fjs.parentNode.insertBefore(js, fjs)
      })(document, "script", "github-buttons")
    }
  }, [])

  return (
    <HeroSection>
      <h1>
        <span role="img" aria-label="wave">
          👋
        </span>{" "}
        Hi! I'm Alex.
      </h1>
      <h2>I build web apps using React, GraphQL, and Node.</h2>
      <FollowButtons>
        <a
          className="twitter-follow-button"
          href="https://twitter.com/ralex1993"
          data-size="large"
        >
          Follow @ralex1993
        </a>
        <a
          className="github-button"
          href="https://github.com/alexanderson1993"
          data-size="large"
          data-show-count="true"
          aria-label="Follow @alexanderson1993 on GitHub"
        >
          Follow @alexanderson1993
        </a>
      </FollowButtons>
    </HeroSection>
  )
}

//           @from-width tablet {
//             h1 {
//               max-width: 90%;
//               font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
//             }

//             h2 {
//               max-width: 90%;
//               font-size: ${`calc(${theme.hero.h1.size} * 0.9)`};
//             }
//             button {
//               font-size: ${theme.font.size.l};
//             }
//           }

//           @from-width desktop {
//             h1 {
//               max-width: 80%;
//               font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
//             }
//             h2 {
//               max-width: 80%;
//               font-size: ${`calc(${theme.hero.h1.size} * 0.8)`};
//             }
//             button {
//               font-size: ${theme.font.size.xl};
//             }
//           }

export default Hero
