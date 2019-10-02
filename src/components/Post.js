import React from "react";

import { MDXRenderer } from "gatsby-plugin-mdx";
import Seo from "./Seo";
import Layout from "./Layout";
import PostMeta from "./PostMeta";
import NextPrev from "./NextPrev";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { useThemeUI, Styled, css as themeCss } from "theme-ui";
import css from "@emotion/css";
import Subscribe from "./Subscribe";
const { mdx } = require("@mdx-js/react");

const FOOTER_AVATAR = graphql`
  query FooterAvatar {
    file(relativePath: { glob: "avatar.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`;

function slice(string, start, delCount, newSubStr) {
  return (
    string.slice(0, start) +
    newSubStr +
    string.slice(start + Math.abs(delCount))
  );
}
function processImagePaths(body, imagePaths) {
  const regExp = /"src": "(.*)",/g;
  const matches = [];
  let output = [];
  while ((output = regExp.exec(body)) !== null) {
    matches.push({ len: output[0].length, index: output.index });
  }
  for (let i = matches.length - 1; i >= 0; i--) {
    const image = imagePaths[i];
    if (image) {
      body = slice(
        body,
        matches[i].index,
        matches[i].len,
        Object.entries(image)
          .map(([key, value]) => `"${key}": \`${value}\`,`)
          .join("\n")
      );
    }
  }
  return body;
}
const Post = ({ data: { post }, location, previous, next, imagePaths }) => {
  const { theme } = useThemeUI();
  const body = processImagePaths(post.body, imagePaths);
  const imageUrl = imagePaths[0] && `${location.origin}${imagePaths[0].src}`;
  const url = location.href;
  return (
    <Layout content>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={imageUrl}
        url={url}
        cardType="summary_large_image"
      />
      <article
        css={css`
          margin: 0 auto;
          max-width: 800px;
          padding: 0 20px;
          h1,
          h2,
          h3 {
            margin-bottom: 0.5rem;
          }
          .caption {
            display: block;
            margin-bottom: 2rem;
            text-align: center;
          }
          .gatsby-image-wrapper {
            border: 0;
            display: block;
            border-radius: 10px;
            overflow: hidden;
            position: absolute;
            top: 0;
            margin-bottom: 2rem;
            box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
            min-height: 500px;
          }
          footer .gatsby-image-wrapper {
            min-height: unset;
          }
        `}
      >
        <h1
          css={themeCss({
            fontSize: 5,
            my: 3,
          })}
        >
          {post.title}
        </h1>
        <PostMeta {...post} />
        <p
          css={css`
            margin: 1rem 0;
          `}
        >
          <small>
            <em>{post.subtext}</em>
          </small>
        </p>

        <MDXRenderer
          scope={{
            mdx: (...args) => {
              if (args[0] === "img") {
                const { alt, ...fluid } = args[1];
                return mdx(Img, { alt, fluid });
              }
              return mdx(...args);
            },
          }}
        >
          {body}
        </MDXRenderer>
        <footer>
          <Subscribe />

          <Styled.div
            css={themeCss({
              my: 3,
              py: 3,
              borderTop: "1px solid",
              borderBottom: " 1px solid",
              borderTopColor: "muted",
              borderBottomColor: "muted",
              display: "flex",
            })}
          >
            <div
              css={css`
                border-radius: 50%;
                border: 1px solid ${theme.colors.muted};
                display: inline-block;
                height: 50px;
                margin: 5px 20px 0 0;
                overflow: hidden;
                width: 50px;
                flex-shrink: 0;
                img {
                  width: 100%;
                }
              `}
            >
              <StaticQuery
                query={FOOTER_AVATAR}
                render={data => <Img fluid={data.file.childImageSharp.fluid} />}
              />{" "}
            </div>
            <div
              css={css`
                font-size: 0.9em;
                line-height: 1.6;
              `}
            >
              <strong>Alex Anderson</strong> is a husband, React web developer,
              Latter-day Saint, amateur rock climber, hobby chef, and spaceship
              enthusiast. He enjoys learning new things, teaching inspiring
              things, building cool things, and doing fun things.
            </div>
          </Styled.div>
          <NextPrev next={next} prev={previous} />
        </footer>
      </article>
    </Layout>
  );
};

export default Post;
