import React from "react"
import { css } from "@emotion/core"
const Root = props => {
  return (
    <div
      css={css`
        :root {
          --bg: aliceblue;
          --meta: #888;
          --accent: #3178cd;
          --text: red;
        }

        & > div > div > div {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          font-size: 3rem;
          -webkit-font-smoothing: antialiased;
          font-feature-settings: "calt", "liga", "hist", "onum", "pnum";

          color: #111;
          background-color: #fefefe;

          a {
            color: #111;

            text-decoration-skip-ink: auto;
          }

          blockquote {
            font-size: 1em;
            font-weight: bold;

            width: 50vw;

            text-align: left;

            p {
              font-size: inherit;
            }
          }

          @media (max-width: 900px) {
            blockquote {
              width: 90vw;
            }
          }

          cite {
            font-size: 80%;
            font-weight: normal;
            font-style: normal;

            display: block;

            margin-top: 2rem;
          }

          pre {
            font-size: 70%;

            display: inline-block;
            overflow-x: scroll;

            margin: 2rem 0;

            text-align: left;

            color: var(--accent);
          }

          code {
            font-family: menlo, monospace;
            font-size: 90%;
          }

          a:hover {
            color: var(--accent);
          }

          h1 {
            font-size: 200%;

            margin-bottom: 0.5rem;
          }

          h2 {
            font-size: 120%;

            margin-bottom: 0.5rem;
          }

          p {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          video {
            max-height: 100vh;
            margin-top: 3rem;
          }
        }
      `}
    >
      {props.children}
    </div>
  )
}

export default Root
