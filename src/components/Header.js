import { Link } from "gatsby"
import React from "react"
// import { ScreenWidthContext } from "../../layouts"
import config from "../../content/meta/config"
// import Menu from "./Menu"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Header, css as themeCss, Styled } from "theme-ui"
import styled from "@emotion/styled"

const AVATAR_QUERY = graphql`
  query Avatar {
    file(relativePath: { glob: "avatar.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`

const HeaderComponent = styled(Header)`
  align-items: center;
  justify-content: center;
  display: flex;
  top: 0;
  width: 100%;
  justify-content: space-between;

  transition: padding 0.5s;
  a.logoType {
    align-items: center;
    display: flex;
    text-align: left;
    flex-direction: row;
    flex-shrink: 0;
    width: auto;
    .logo {
      flex-shrink: 0;
    }
  }
  &.homepage {
    position: absolute;
    background-color: transparent;
  }
  h2 {
    letter-spacing: 0;
    margin: 0;
  }
  &.homepage .logo {
    height: 60px;
    width: 60px;
  }
  .logo {
    border-radius: 65% 75%;
    display: inline-block;
    height: 44px;
    overflow: hidden;
    width: 44px;
    transition: all 0.5s;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
`

const NavMenu = styled.nav`
  border-top: none;
  background: transparent;
  display: flex;
  position: relative;
  justify-content: flex-end;
  padding-left: 50px;
  transition: none;
`
const ItemList = styled.ul`
  display: flex;
  justify-content: flex-end;
  padding: 0;
`

const Item = ({ to, children }) => {
  return (
    <li
      css={themeCss({
        listStyle: "none",
        px: 1,
      })}
    >
      <Link
        css={themeCss({ color: "primary", ":hover": { color: "secondary" } })}
        to={to}
      >
        {children}
      </Link>
    </li>
  )
}
const HeaderComp = () => {
  const pages = [
    { to: "/blog/", label: "Blog" },
    { to: "/decks/", label: "Presentations" },
    // { to: "/category/", label: "Categories" },
    // { to: "/search/", label: "Search" },
    // { to: "/about", label: "About" },
    // { to: "/contact/", label: "Contact" },
  ]
  return (
    <HeaderComponent css={themeCss({ padding: 3 })}>
      <Link to="/" className="logoType">
        <div className="logo">
          <StaticQuery
            query={AVATAR_QUERY}
            render={data => <Img fluid={data.file.childImageSharp.fluid} />}
          />
        </div>
        <Styled.div css={themeCss({ paddingLeft: 1 })}>
          <h1
            css={themeCss({
              color: "primary",
              ":hover": { color: "secondary" },
            })}
          >
            {config.headerTitle}
          </h1>
        </Styled.div>
      </Link>

      <NavMenu rel="js-menu">
        <ItemList>
          {pages.map(item => (
            <Item to={item.to} key={item.label}>
              {item.label}
            </Item>
          ))}
        </ItemList>
      </NavMenu>
    </HeaderComponent>
  )
}

export default HeaderComp
