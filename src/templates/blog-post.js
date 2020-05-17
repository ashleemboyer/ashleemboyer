import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/Layout';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout
      title={post.frontmatter.title}
      description={post.frontmatter.description}
      image={post.frontmatter.image}
      url={post.fields.slug}
    >
      <div>
        {post.frontmatter.image && (
          <img
            src={post.frontmatter.image}
            alt={post.frontmatter.alt}
            css={{ borderRadius: '4px' }}
          />
        )}
        <div>
          <h1 css={{ marginBottom: '12px' }}>{post.frontmatter.title}</h1>
          <p className="light" css={{ fontStyle: 'italic' }}>
            {post.frontmatter.date} &mdash; {post.timeToRead} minute read
          </p>
          {/* todo: probably need to parse this stuff for display purposes */}
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </div>
      </div>
    </Layout>
  );
};

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
      fields {
        slug
      }
    }
  }
`;
