import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';
import Layout from '../components/Layout/Layout';

const PAGE_SIZE = 5;

export default ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const allPosts = data.allMarkdownRemark.edges;
  const numPages = Math.ceil(data.allMarkdownRemark.totalCount / PAGE_SIZE) - 1;
  const paginatedPosts = allPosts.slice(
    PAGE_SIZE * currentPage,
    PAGE_SIZE * currentPage + PAGE_SIZE
  );

  return (
    <Layout>
      <h1
        css={{
          fontSize: rhythm(2.4),
          marginBottom: '16px',
        }}
      >
        Journey of a Disabled Web Developer
      </h1>
      <h3 className="light" css={{ marginBottom: '48px' }}>
        She's written {data.allMarkdownRemark.totalCount} Posts
      </h3>
      {paginatedPosts.map(({ node }) => (
        <div
          key={node.id}
          css={{
            marginBottom: rhythm(1.6),
          }}
        >
          <div id={node.id}>
            <h2 css={{ fontSize: '2rem', marginBottom: 12 }}>
              {node.frontmatter.title}
            </h2>
            <p css={{ margin: 0, marginBottom: '12px' }}>{node.excerpt}</p>
            <Link
              to={node.fields.slug}
              css={{
                color: '#C2185B',
              }}
            >
              Keep Reading
            </Link>
          </div>
          <hr />
        </div>
      ))}
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {currentPage > 0 && (
          <button
            css={{
              padding: 0,
              border: 0,
              backgroundColor: 'transparent',
              color: '#c2185b',
              textDecoration: 'underline',
            }}
            onClick={() => {
              setCurrentPage(currentPage - 1);
              const firstPost = document.getElementById(
                paginatedPosts[0].node.id
              );
              const boundingClientRect = firstPost.getBoundingClientRect();
              window.scrollBy(0, boundingClientRect.y - 20);
            }}
          >
            Newer Posts
          </button>
        )}
        <p css={{ margin: '0 12px', textAlign: 'center' }}>
          {PAGE_SIZE * currentPage + 1} -{' '}
          {PAGE_SIZE * currentPage + paginatedPosts.length} of{' '}
          {data.allMarkdownRemark.totalCount}
        </p>
        {currentPage < numPages && (
          <button
            css={{
              padding: 0,
              border: 0,
              backgroundColor: 'transparent',
              color: '#c2185b',
              textDecoration: 'underline',
            }}
            onClick={() => {
              setCurrentPage(currentPage + 1);
              const firstPost = document.getElementById(
                paginatedPosts[0].node.id
              );
              const boundingClientRect = firstPost.getBoundingClientRect();
              window.scrollBy(0, boundingClientRect.y - 20);
            }}
          >
            Older Posts
          </button>
        )}
      </div>
    </Layout>
  );
};

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
          }
          fields {
            slug
          }
          excerpt(format: PLAIN, pruneLength: 200, truncate: false)
        }
      }
    }
  }
`;
