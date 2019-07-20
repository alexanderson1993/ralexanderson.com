import "typeface-open-sans"
import React from "react"
import Footer from "./Footer"
import Header from "./Header"
import { FaLightbulb } from "react-icons/fa"
import GlobalStyles from "./GlobalStyles"
import { useColorMode, css } from "theme-ui"

const Layout = ({ location = {}, children }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <div
      css={css({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      })}
    >
      <Header path={location.pathname} />
      <main
        css={css({
          flex: 1,
        })}
      >
        {children}
      </main>
      <Footer />
      <GlobalStyles />
      <FaLightbulb
        css={css({
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: 3,
          color: "primary",
          borderColor: "primary",
          borderStyle: "solid",
          borderWidth: 2,
          padding: 1,
          fontSize: 3,
          boxSizing: "content-box",
          borderRadius: 10,
          cursor: "pointer",
        })}
        onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
      />
    </div>
  )
}

export default Layout
