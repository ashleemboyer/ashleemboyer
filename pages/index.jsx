import fs from 'fs';
import path from 'path';
import marked from 'marked';
import Link from 'next/link';

import { Layout } from '../components';

const HomePage = ({ posts }) => {
  const postsCount = posts.length;

  return (
    <Layout
      title="Ashlee M Boyer"
      description="You can find me writing about issues surrounding Disability, Accessibility, and Mental Health."
    >
      <h1 style={{ marginBottom: 20 }}>Journey of a Disabled Web Developer</h1>
      <p
        style={{
          marginBottom: 48,
          fontSize: '1.4rem',
          fontFamily: 'Lora',
          color: '#505050',
        }}
      >
        She's written {postsCount} posts.
      </p>
      {posts.map((post, index) => (
        <div key={post.fileName}>
          <h2 style={{ marginBottom: 12 }}>{post.meta.title}</h2>
          <p
            style={{ marginBottom: 12 }}
            dangerouslySetInnerHTML={{ __html: post.meta.excerpt }}
          ></p>
          <Link href={`/${post.fileName}`}>
            <a>Keep Reading</a>
          </Link>
          {index !== postsCount - 1 && <hr />}
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  let posts = [];

  const postsDirectory = path.join(process.cwd(), 'posts');
  const yearDirectoryNames = fs.readdirSync(postsDirectory);

  yearDirectoryNames.forEach((yearDirectoryName) => {
    const yearDirectory = path.join(postsDirectory, yearDirectoryName);
    const monthDirectoryNames = fs.readdirSync(yearDirectory);

    monthDirectoryNames.forEach((monthDirectoryName) => {
      const monthDirectory = path.join(yearDirectory, monthDirectoryName);
      const fileNames = fs.readdirSync(monthDirectory);

      fileNames.forEach((fileName) => {
        const filePath = path.join(monthDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const contentsPieces = fileContents.split('---\n');
        const frontmatter = contentsPieces[1];
        const body = contentsPieces[2];

        let meta = {};
        frontmatter.split('\n').forEach((attribute) => {
          const [key, value] = attribute.split(': ');
          if (key) {
            meta[key] = value;
          }
        });

        const getExcerpt = (text) => {
          let result = '';
          let resultLength = 0;

          text.split(' ').forEach((piece) => {
            if (resultLength > 200) {
              return result;
            }

            result = `${result} ${piece}`;
            resultLength += piece.length;
          });

          return result.trim();
        };

        const parsed = marked(body);
        const withoutTags = parsed.replace(/<[^>]*>/g, '');
        meta.excerpt = `${getExcerpt(withoutTags)} ...`;

        posts.push({
          meta,
          content: parsed,
          fileName: fileName.substring(0, fileName.length - 3),
        });
      });
    });
  });

  posts = posts.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    }

    return -1;
  });

  return { props: { posts: posts } };
}

export default HomePage;
