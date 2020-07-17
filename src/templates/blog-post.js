import React from 'react';
import { Link, graphql } from 'gatsby';

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
      {post.frontmatter.image && (
        <img
          src={post.frontmatter.image}
          alt={post.frontmatter.alt}
          css={{ borderRadius: '4px' }}
        />
      )}
      <div>
        <h1 css={{ marginBottom: '12px' }}>{post.frontmatter.title}</h1>
        <p className="light" css={{ fontStyle: 'italic', marginBottom: '8px' }}>
          {post.frontmatter.date} &mdash; {post.timeToRead} minute read
        </p>
        <div css={{ marginBottom: '24px' }}>
          {post.frontmatter.tags.map(tag => (
            <Link
              to={`/tags/${tag}`}
              css={{
                marginRight: '6px',
                backgroundColor: '#c2185b',
                color: 'white',
                padding: '2px 8px',
                fontSize: '0.8rem',
                borderRadius: '1.75rem',
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>
        {/* todo: probably need to parse this stuff for display purposes */}
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
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
        tags
      }
      timeToRead
      fields {
        slug
      }
    }
  }
`;
