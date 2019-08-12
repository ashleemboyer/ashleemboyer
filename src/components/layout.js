import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import { rhythm } from "../utils/typography"

export default ({ children, title, description, image, url }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const bigTitle = title
    ? `${data.site.siteMetadata.title} | ${title}`
    : data.site.siteMetadata.title

  return (
    <div
      css={{
        margin: "0 auto",
        maxWidth: 900,
        padding: rhythm(1),
      }}
    >
      <Helmet title={bigTitle}>
        <meta charSet="utf-8" />

        {title && <meta name="title" content={title} />}
        {title && <meta property="og:title" content={title} />}
        {title && <meta name="twitter:title" content={title} />}

        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {description && (
          <meta name="twitter:description" content={description} />
        )}

        {image && <meta name="image" content={image} />}
        {image && <meta property="og:image" content={image} />}
        {image && <meta name="twitter:image" content={image} />}

        {url && <meta property="og:url" content={url} />}

        {/* {image && (
          <>
            <meta name="image" content={image} />
            <meta property="og:image" content={image} />
            <meta name="twitter:image" content={image} />
          </>
        )} */}
        {/* {url && <meta name="og:url" content={url} />} */}
      </Helmet>
      <div css={{ maxWidth: 700, margin: "0 auto" }}>
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
          Dog mom to Trooper | Engineer of software | Lover of learning |
          Partner of Zach | She/her/hers | HOH 👂🏻
        </p>
      </div>
      {children}
    </div>
  )
}
