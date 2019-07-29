import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        {post.frontmatter.image && (
          <img src={post.frontmatter.image} alt={post.frontmatter.alt} />
        )}
        <h1>{post.frontmatter.title}</h1>
        <p css={{ color: "#888" }}>
          <em>
            {post.frontmatter.date} &mdash; {post.timeToRead} minute read
          </em>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image
        alt
      }
      timeToRead
    }
  }
`
