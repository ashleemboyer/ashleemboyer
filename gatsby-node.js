const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const filePath = createFilePath({ node, getNode, basePath: `pages` });
    const splitPath = filePath.split('/');
    const pageTitle = splitPath[splitPath.length - 2];
    const slug = `/${pageTitle}`;
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        distinct(field: frontmatter___tags)
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          slug: node.fields.slug,
        },
      });
    });

    result.data.allMarkdownRemark.distinct.forEach(tag => {
      createPage({
        path: `/tags/${tag}`,
        component: path.resolve('./src/templates/tag.js'),
        context: {
          tag: tag,
        },
      });
    });
  });
};
