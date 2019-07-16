import React from "react"
import css from "@emotion/css"
import { useTheme } from "../helpers/theme"

const Footer = () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      <footer
        css={css`
          background: ${theme.color.neutral.white};
          padding-top: 0;

          ul {
            list-style: none;
            text-align: center;
            padding: 0;

            li {
              color: ${theme.color.neutral.gray.i};
              font-size: ${theme.font.size.xxs};
              padding: ${theme.space.xxs} ${theme.space.s};
              position: relative;
              display: inline-block;

              &::after {
                content: "•";
                position: absolute;
                right: ${`calc(${theme.space.xs} * -1)`};
              }
              &:last-child::after {
                content: "";
              }
            }
          }
        `}
        className="footer"
      >
        <ul>
          <li>
            built with ♡ by <em>Alex Anderson</em>
          </li>
          <li>
            delivered by{" "}
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Netlify
            </a>
          </li>
          <li>
            photos by{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              unsplash.com
            </a>
          </li>
        </ul>
      </footer>
    </React.Fragment>
  )
}

export default Footer
