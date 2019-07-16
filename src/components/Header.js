import { Link } from "gatsby"
import React from "react"
// import { ScreenWidthContext } from "../../layouts"
import config from "../../content/meta/config"
// import Menu from "./Menu"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { useTheme, withTheme } from "../helpers/theme"
import styled from "@emotion/styled"
import css from "@emotion/css"

export const AVATAR_QUERY = graphql`
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

const HeaderComponent = withTheme(styled.header`
  align-items: center;
  justify-content: center;
  background-color: ${theme => theme.color.neutral.white};
  display: flex;
  height: ${theme => theme.header.height.default};
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: space-between;
  padding: ${theme => theme.space.inset.l};

  transition: padding 0.5s;
  a.logoType {
    align-items: center;
    display: flex;
    color: ${theme => theme.text.color.primary};
    text-align: left;
    flex-direction: row;
    flex-shrink: 0;
    width: auto;
    .logo {
      flex-shrink: 0;
      margin: ${theme => theme.space.inline.default};
    }
  }
  &.homepage {
    position: absolute;
    background-color: transparent;
    height: ${theme => theme.header.height.homepage};
  }
  h1 {
    font-size: ${theme => theme.font.size.m};
    font-weight: ${theme => theme.font.weight.standard};
    margin: ${theme => theme.space.stack.xs};
    color: ${theme => theme.color.neutral.white};
  }

  h2 {
    font-weight: ${theme => theme.font.weight.standard};
    font-size: ${theme => theme.font.size.xxs};
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
    margin: ${theme => theme.space.inline.default};
    overflow: hidden;
    width: 44px;
    transition: all 0.5s;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
`)

const NavMenu = withTheme(styled.nav`
  border-top: none;
  background: transparent;
  display: flex;
  position: relative;
  justify-content: flex-end;
  padding-left: 50px;
  transition: none;
`)
const ItemList = withTheme(styled.ul`
  display: flex;
  justify-content: flex-end;
  padding: 0;
`)
const Item = ({ to, children }) => {
  const theme = useTheme()
  return (
    <li
      css={css`
        list-style: none;
        a {
          color: ${theme.color.neutral.white};
          padding: ${theme.space.inset.s};
          transition: all ${theme.time.duration.default};
          border-radius: ${theme.size.radius.small};
          &:hover {
            color: ${theme.color.brand.light};
          }
        }
      `}
    >
      <Link to={to}>{children}</Link>
    </li>
  )
}
const Header = () => {
  const pages = [
    { to: "/blog/", label: "Blog" },
    // { to: "/category/", label: "Categories" },
    // { to: "/search/", label: "Search" },
    // { to: "/about", label: "About" },
    // { to: "/contact/", label: "Contact" },
  ]
  return (
    <HeaderComponent className="homepage">
      <Link to="/" className="logoType">
        <div className="logo">
          <StaticQuery
            query={AVATAR_QUERY}
            render={data => <Img fluid={data.file.childImageSharp.fluid} />}
          />
        </div>
        <div className="type">
          <h1>{config.headerTitle}</h1>
          <h2>{config.headerSubTitle}</h2>
        </div>
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

export default Header
