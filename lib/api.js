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
  const date = new Date(`${unformatted} 00:00:00`);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    timeZone: 'America/Indianapolis',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);
  return `${month} ${day}, ${year}`;
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

        const parsed = marked(body);
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
