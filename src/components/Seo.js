import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const Seo = ({ title, description, image, url }) => {
  return (
    <StaticQuery
      query={graphql`
        query SeoQuery {
          site {
            siteMetadata {
              title
              siteUrl
              description
              social {
                name
                url
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <Helmet
            htmlAttributes={{
              prefix: "og: http://ogp.me/ns#",
            }}
          >
            {/* General tags */}
            <title>{title}</title>
            <meta
              name="description"
              content={description || data.site.siteMetadata.description}
            />
            {/* OpenGraph tags */}
            <meta
              property="og:url"
              content={url || data.site.siteMetadata.siteUrl}
            />
            <meta
              property="og:title"
              content={title || data.site.siteMetadata.title}
            />
            <meta
              property="og:description"
              content={description || data.site.siteMetadata.description}
            />
            <meta
              property="og:image"
              content={
                image ||
                data.site.siteMetadata.siteUrl +
                  "/" +
                  data.site.siteMetadata.siteImage
              }
            />
            <meta property="og:type" content="website" />
            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:image"
              content={
                image ||
                data.site.siteMetadata.siteUrl +
                  "/" +
                  data.site.siteMetadata.siteImage
              }
            />
            <meta
              name="twitter:creator"
              content={data.site.siteMetadata.social
                .find(s => s.name === "twitter")
                .url.replace("https://twitter.com/", "")}
            />
          </Helmet>
        )
      }}
    />
  )
}

export default Seo
