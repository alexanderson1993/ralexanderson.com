import "typeface-open-sans"
import PropTypes from "prop-types"
import React from "react"

import Footer from "./Footer"
import Header from "./Header"

import styled from "@emotion/styled"
import ThemeProvider, { withTheme } from "../helpers/theme"
import GlobalStyles from "./GlobalStyles"

const Main = withTheme(styled.main`
  ${({ content, ...theme }) =>
    content
      ? `
    padding: 0 ${theme.space.inset.default};
    padding-top:6rem;
`
      : ""}

  min-height: calc(100vh - 20px);
`)

const Layout = ({ location = {}, content, children }) => {
  return (
    <ThemeProvider>
      <>
        <Header path={location.pathname} />
        <Main content={content}>{children}</Main>
        <Footer />
        <GlobalStyles />
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Layout
