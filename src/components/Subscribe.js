import React from "react";

import { css as themeCSS } from "theme-ui";
import css from "@emotion/css";

const Subscribe = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div>
        Like what you read? Subscribe to the newsletter to get notified about
        the nearly-weekly blog posts.
      </div>
      <form
        css={themeCSS({
          borderTop: "1px solid",
          borderTopColor: "muted",
          padding: 3,
          paddingBottom: 2,
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
          <input type="text" name="email" id="tlemail" />
        </p>
        <input type="hidden" value="1" name="embed" />
        <input type="submit" value="Subscribe" />
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
