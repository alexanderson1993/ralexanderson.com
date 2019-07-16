import React from "react"
import Hero from "../components/Hero"
import Seo from "../components/Seo"
import Layout from "../components/Layout"

const IndexPage = props => {
  return (
    <Layout {...props}>
      <Seo />
      <Hero />
    </Layout>
  )
}

export default IndexPage
