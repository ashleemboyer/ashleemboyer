import React from "react"
import { Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <div>
      <h1 css={{ display: "inlineBlock", borderBottom: "1px solid" }}>
        Journey of a Disabled Web Dev
      </h1>
      <h4>She's written {data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id} css={{ marginTop: rhythm(2) }}>
          <Link
            to={node.fields.slug}
            css={{ textDecoration: "none", color: "inherit" }}
          >
            {node.frontmatter.image && (
              <img src={node.frontmatter.image} alt={node.frontmatter.alt} />
            )}
            <h3 css={{ marginBottom: rhythm(1 / 4) }}>
              {node.frontmatter.title}{" "}
              <span css={{ color: "#888" }}>- {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
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
