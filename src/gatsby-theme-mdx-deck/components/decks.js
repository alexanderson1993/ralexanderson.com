/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Layout from "../../components/Layout"

export default ({ decks }) => {
  return (
    <Layout>
      <div
        sx={{
          fontWeight: "bold",
          px: 4,
          py: 3,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Styled.h1>Presentations</Styled.h1>
        <Styled.p>
          This is a selection of presentations which I have given over the last
          few years.
        </Styled.p>
        <Styled.ul
          sx={{
            p: 0,
          }}
        >
          {decks.map(d => (
            <Styled.li
              key={d.id}
              sx={{
                my: 2,
              }}
            >
              <Link
                to={d.slug}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {d.title || d.slug}
              </Link>
            </Styled.li>
          ))}
        </Styled.ul>
      </div>
    </Layout>
  )
}
