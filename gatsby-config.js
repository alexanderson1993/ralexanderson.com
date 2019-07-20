const mdxFeed = require("gatsby-plugin-mdx/feed")
const path = require("path")

const toPostPath = post => {
  const pathParts = post.split("/")
  const name = pathParts[pathParts.length - 2]
  return name.replace(/\d{4}-\d{2}-\d{2}--/gi, "")
}

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/posts`,
        name: `content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/assets`,
        name: `content/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-relative-images-v2`,
          },
          `gatsby-plugin-sharp`,

          {
            resolve: `gatsby-remark-images`,
            options: {
              // should this be configurable by the end-user?
              maxWidth: 1380,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 2em`,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
        ],
        remarkPlugins: [require(`remark-slug`)],
      },
    },
    {
      resolve: "gatsby-theme-mdx-deck",
      options: {
        // source directory for decks
        contentPath: "content/decks",
        // name routes' basepath
        basePath: "/decks",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        /**
         * no need to specify the other options, since they will be merged with this
         */
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                const slug = toPostPath(edge.node.fileAbsolutePath)
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + "/blog/" + slug,
                  guid: site.siteMetadata.siteUrl + "/blog/" + slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                }
              })
            },
            query: `
            {
              allMdx(
                limit: 1000,
                sort: {
                  order: DESC,
                  fields: [frontmatter___date]
                }
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                    }
                    excerpt
                    fileAbsolutePath
                    html
                  }
                }
              }
            }
          `,
            output: `rss.xml`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `R. Alex Anderson`,
    author: `Alex Anderson`,
    description: `Web Developer - Hobby Chef - Truth Seeker`,
    siteUrl: "https://ralexanderson.com",
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/ralex1993`,
      },
      {
        name: `github`,
        url: `https://github.com/alexanderson1993`,
      },
    ],
  },
}
