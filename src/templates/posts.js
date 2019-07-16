import React from "react"

import Posts from "../components/Posts"

export default ({
  pageContext: { posts, siteTitle, socialLinks },
  location,
}) => (
  <Posts
    location={location}
    posts={posts}
    siteTitle={siteTitle}
    socialLinks={socialLinks}
  />
)
