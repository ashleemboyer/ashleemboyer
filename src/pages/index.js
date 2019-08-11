import React from "react"
import { Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <div>
      <h1 css={{ fontSize: rhythm(2.4), marginBottom: rhythm(0.8) }}>
        Journey of a Disabled Web Developer
      </h1>
      <h3 className="light" css={{ marginBottom: rhythm(2) }}>
        She's written {data.allMarkdownRemark.totalCount} Posts
      </h3>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div
          key={node.id}
          css={{
            // todo: selector for all but last?
            marginBottom: rhythm(1.6),
            border: "1px solid #bdbdbd",
            borderRadius: "4px",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
            ":hover": {
              boxShadow:
                "0 10px 16px rgba(0,0,0,0.26), 0 6px 6px rgba(0,0,0,0.22)",
            },
            backgroundColor: "#fff",
          }}
        >
          <Link
            to={node.fields.slug}
            css={{ textDecoration: "none", color: "inherit" }}
          >
            {node.frontmatter.image && (
              <img
                src={node.frontmatter.image}
                alt={node.frontmatter.alt}
                css={{ borderRadius: "4px 4px 0 0", margin: 0, width: "100%" }}
              />
            )}
            <div css={{ padding: "12px" }}>
              <h2 css={{ marginBottom: rhythm(1 / 4) }}>
                {node.frontmatter.title}{" "}
                <span className="light">- {node.frontmatter.date}</span>
              </h2>
              <p css={{ margin: 0 }}>{node.excerpt}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            image
            alt
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
