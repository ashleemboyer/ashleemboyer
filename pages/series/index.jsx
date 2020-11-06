import Link from 'next/link';
import { getAllSeries } from '../../lib/api';
import { Layout } from '../../components';

const SeriesIndex = ({ series }) => (
  <Layout title="Ashlee M Boyer | Blogging Series">
    <h1 style={{ marginBottom: 20 }}>Blogging Series</h1>
    <p
      style={{
        marginBottom: 48,
        fontSize: '1.4rem',
        fontFamily: 'Lora',
        color: '#505050',
      }}
    >
      She's written {series.length} series.
    </p>
    {series.map(({ slug, title }) => (
      <Link href={`/series/${slug}`}>
        <a
          style={{
            display: 'block',
            marginBottom: 16,
            color: 'black',
          }}
          onClick={() => {
            if (typeof ga !== 'undefined') {
              ga('send', {
                hitType: 'event',
                eventCategory: 'Series',
                eventAction: 'Series Click',
                eventLabel: slug,
              });
            }
          }}
        >
          <h2>{title}</h2>
        </a>
      </Link>
    ))}
  </Layout>
);

export async function getStaticProps() {
  let series = getAllSeries();

  series = series.sort((a, b) => (a.title < b.title ? -1 : 1));

  return { props: { series } };
}

export default SeriesIndex;
