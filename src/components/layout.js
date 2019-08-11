import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      css={{
        margin: "0 auto",
        maxWidth: 700,
        padding: rhythm(1),
      }}
    >
      <Link to={`/`}>
        <h3
          css={{
            marginBottom: rhythm(0.4),
            display: "inline-block",
            fontStyle: "normal",
            color: "#212121",
          }}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <p css={{ marginBottom: rhythm(1.4) }}>
        Dog mom to Trooper | Engineer of software | Lover of learning | Partner
        of Zach | She/her/hers | HOH 👂🏻
      </p>
      {children}
    </div>
  )
}
