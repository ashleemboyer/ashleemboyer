import Link from 'next/link';
import HeadWrapper from './HeadWrapper';
import styles from './Layout.module.scss';

const Layout = ({ title, description, image, slug, children }) => (
  <div className={styles.Layout}>
    <HeadWrapper
      title={title}
      description={description}
      image={image}
      slug={slug}
    />
    <header>
      <img
        src="/me.png"
        alt="Ashlee standing in front of a brick wall looking up to her left and smiling. Her right hand is held up near her right shoulder with the palm facing upwards."
      />
      <div>
        <Link href="/">
          <h2>Ashlee M Boyer</h2>
        </Link>
        <p>
          You can find me talking about issues surrounding Disability,
          Accessibility, & Mental Health on{' '}
          <a href="https://twitter.com/ashleemboyer">Twitter</a>, or you can
          find me regularly live-knitting or live-coding on{' '}
          <a href="https://twitch.tv/ashleemboyer">Twitch</a>.
        </p>
      </div>
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
