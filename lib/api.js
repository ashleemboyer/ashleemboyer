import fs from 'fs';
import { join } from 'path';
import marked from 'marked';

const frontmatterToMeta = (frontmatter) => {
  let meta = {};

  frontmatter.split('\n').forEach((attribute) => {
    const [key, value] = attribute.split(': ');
    if (key) {
      meta[key] = value;
    }
  });

  return meta;
};

const getExcerpt = (words) => {
  let result = '';
  let resultLength = 0;

  words.forEach((piece) => {
    if (resultLength > 200) {
      return result;
    }

    result = `${result} ${piece}`;
    resultLength += piece.length;
  });

  return result.trim();
};

const getFormattedDate = (unformatted) => {
  const asDate = new Date(`${unformatted}T00:00:00`);
  const options = {
    dateStyle: 'full',
  };
  return asDate.toLocaleDateString('en-US', options);
};

export function getAllPosts() {
  let posts = [];

  const postsDirectory = join(process.cwd(), 'posts');
  const yearDirectoryNames = fs.readdirSync(postsDirectory);

  yearDirectoryNames.forEach((yearDirectoryName) => {
    const yearDirectory = join(postsDirectory, yearDirectoryName);
    const monthDirectoryNames = fs.readdirSync(yearDirectory);

    monthDirectoryNames.forEach((monthDirectoryName) => {
      const monthDirectory = join(yearDirectory, monthDirectoryName);
      const fileNames = fs.readdirSync(monthDirectory);

      fileNames.forEach((fileName) => {
        const filePath = join(monthDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const contentsPieces = fileContents.split('---\n');
        const frontmatter = contentsPieces[1];
        const body = contentsPieces[2];

        let parsedBodyPieces = [];
        const bodyPieces = body.split('```');
        parsedBodyPieces = bodyPieces.map((piece, index) => {
          const isACodePiece = index % 2 !== 0;
          if (isACodePiece) {
            const parsedLines = [];
            const lines = piece.split('\n');
            const language = lines[0];
            lines.slice(1).forEach((line, index) => {
              parsedLines.push(
                [
                  '<div>',
                  `<span class="line-number">${index + 1}</span>`,
                  `<span class="line-of-code">${line}</span>`,
                  '</div>',
                ].join('||'),
              );
            });
            return `<pre${
              language ? ` class="language-${language}"` : ''
            }>||${parsedLines.join('||')}||</pre>`;
          }

          return piece;
        });

        const parsed = marked(parsedBodyPieces.join(''));
        const withoutTags = parsed.replace(/<[^>]*>/g, '');
        const words = withoutTags.split(' ');

        const meta = frontmatterToMeta(frontmatter);
        meta.excerpt = `${getExcerpt(words)} ...`;
        meta.tags = meta.tags.substring(1, meta.tags.length - 1).split(', ');
        meta.timeToRead = `${Math.ceil(words.length / 200)} minute read`;
        meta.formattedDate = getFormattedDate(meta.date);

        posts.push({
          meta,
          content: parsed,
          fileName: fileName.substring(0, fileName.length - 3),
        });
      });
    });
  });

  return posts;
}

export function getAllTagNames() {
  let tagNames = {};

  const postsDirectory = join(process.cwd(), 'posts');
  const yearDirectoryNames = fs.readdirSync(postsDirectory);

  yearDirectoryNames.forEach((yearDirectoryName) => {
    const yearDirectory = join(postsDirectory, yearDirectoryName);
    const monthDirectoryNames = fs.readdirSync(yearDirectory);

    monthDirectoryNames.forEach((monthDirectoryName) => {
      const monthDirectory = join(yearDirectory, monthDirectoryName);
      const fileNames = fs.readdirSync(monthDirectory);

      fileNames.forEach((fileName) => {
        const filePath = join(monthDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const contentsPieces = fileContents.split('---\n');
        const frontmatter = contentsPieces[1];
        const meta = frontmatterToMeta(frontmatter);
        const tags = meta.tags.substring(1, meta.tags.length - 1).split(', ');
        tags.forEach((tag) => {
          tagNames[tag] = true;
        });
      });
    });
  });

  return Object.keys(tagNames);
}

export function getAllSeries() {
  let series = {};

  const postsDirectory = join(process.cwd(), 'posts');
  const yearDirectoryNames = fs.readdirSync(postsDirectory);

  yearDirectoryNames.forEach((yearDirectoryName) => {
    const yearDirectory = join(postsDirectory, yearDirectoryName);
    const monthDirectoryNames = fs.readdirSync(yearDirectory);

    monthDirectoryNames.forEach((monthDirectoryName) => {
      const monthDirectory = join(yearDirectory, monthDirectoryName);
      const fileNames = fs.readdirSync(monthDirectory);

      fileNames.forEach((fileName) => {
        const filePath = join(monthDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        const contentsPieces = fileContents.split('---\n');
        const frontmatter = contentsPieces[1];
        const meta = frontmatterToMeta(frontmatter);
        if (meta.series_slug) {
          series[meta.series_slug] = meta.series_title;
        }
      });
    });
  });

  return Object.keys(series).map((slug) => ({ slug, title: series[slug] }));
}

export function getAllPostNames() {
  let postNames = [];

  const postsDirectory = join(process.cwd(), 'posts');
  const yearDirectoryNames = fs.readdirSync(postsDirectory);

  yearDirectoryNames.forEach((yearDirectoryName) => {
    const yearDirectory = join(postsDirectory, yearDirectoryName);
    const monthDirectoryNames = fs.readdirSync(yearDirectory);

    monthDirectoryNames.forEach((monthDirectoryName) => {
      const monthDirectory = join(yearDirectory, monthDirectoryName);
      const fileNames = fs.readdirSync(monthDirectory);

      fileNames.forEach((fileName) => {
        postNames.push(fileName.substring(0, fileName.length - 3));
      });
    });
  });

  return postNames;
}

export function getPostBySlug(slug) {
  const allPosts = getAllPosts();

  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    if (post.fileName === slug) {
      return post;
    }
  }

  return {};
}

export function getPostsByTag(tag) {
  const posts = [];
  const allPosts = getAllPosts();

  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    if (post.meta.tags.indexOf(tag) !== -1) {
      posts.push(post);
    }
  }

  return posts;
}

export function getPostsBySeriesSlug(slug) {
  const posts = [];
  const allPosts = getAllPosts();

  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    if (post.meta.series_slug === slug) {
      posts.push(post);
    }
  }

  return posts;
}
