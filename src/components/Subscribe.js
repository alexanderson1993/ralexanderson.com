import React from "react";

import { css as themeCSS } from "theme-ui";

const Subscribe = () => {
  return (
    <div
      css={themeCSS({
        borderTop: "1px solid",
        borderTopColor: "muted",
        padding: 3,
        paddingBottom: 2,
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      })}
    >
      <div
        css={themeCSS({
          flex: 1,
          paddingRight: 4,
          borderRight: "1px solid",
          borderRightColor: "muted",
          lineHeight: 1.5,
        })}
      >
        Like what you read? Subscribe to the newsletter to get notified about
        the nearly-weekly blog posts about tech, React, JavaScript, baking,
        spaceships, and more!
      </div>
      <form
        css={themeCSS({
          flex: 1,
          textAlign: "center",
        })}
        action="https://tinyletter.com/alexanderson1993"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://tinyletter.com/alexanderson1993', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
      >
        <p>
          <label for="tlemail">Enter your email address</label>
        </p>
        <p>
          <input
            type="text"
            name="email"
            id="tlemail"
            css={themeCSS({
              borderColor: "muted",
              border: "1px solid",
              borderRadius: 2,
              fontSize: 2,
              padding: 1,
              margin: 1,
            })}
          />
        </p>
        <input type="hidden" value="1" name="embed" />
        <input
          type="submit"
          value="Subscribe"
          css={themeCSS({
            borderColor: "muted",
            border: "1px solid",
            backgroundColor: "primary",
            color: "invertText",
            borderRadius: 2,
            fontSize: 2,
            padding: 1,
            margin: 1,
            cursor: "pointer",
          })}
        />
        <p>
          <a
            href="https://tinyletter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            powered by TinyLetter
          </a>
        </p>
      </form>
    </div>
  );
};
export default Subscribe;
