import { getAllSeries, getPostsBySeriesSlug } from '../../lib/api';
import { Layout, PostList } from '../../components';
import { useLayoutEffect } from 'react';

const SeriesPage = ({ posts }) => {
  useLayoutEffect(() => {
    if (typeof ga !== 'undefined') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Series',
        eventAction: 'Series Landing',
        eventLabel: posts[0].meta.series_slug,
      });
    }
  }, []);

  return (
    <Layout title={`The "${posts[0].meta.series_title}" Series`}>
      <PostList
        title={`Posts in the "${posts[0].meta.series_title}" series`}
        subtitle={`She's written ${posts.length} posts`}
        posts={posts}
      />
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  let posts = getPostsBySeriesSlug(params.slug);

  posts = posts.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    }

    return -1;
  });

  return { props: { posts } };
}

export async function getStaticPaths() {
  const series = getAllSeries();

  return {
    paths: series.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export default SeriesPage;
