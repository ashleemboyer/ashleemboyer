import { Button, Input } from '@components';
import styles from '@stylesheets/index.module.scss';

interface Post {
  title: string;
  excerpt: string;
}

const posts: Post[] = [
  {
    title: 'What the heck is "web a11y"?',
    excerpt:
      "If you've seen \"a11y\" floating around the web development space and you're not sure what it means or how to say it, you're absolutely not alone. Don't feel bad! Almost no one knows what it is until someone else tells ...",
  },
  {
    title: 'How I Added an RSS Feed to My Next.js Site',
    excerpt:
      'I recently came across a tweet from Sara Soueidan applauding folks who provide an RSS feed on their site. Sara is someone I highly admire in frontend web development and accessibility, but I had so little knowledge of RSS feeds and so many questions: What ...',
  },
  {
    title: 'How to Create Your Own Next.js RSS Reader App',
    excerpt:
      'I recently came across a tweet from Sara Soueidan applauding folks who provide an RSS feed on their site. Sara is someone I highly admire in frontend web development and accessibility, but I had so little knowledge of RSS feeds and so many questions: What ...',
  },
];

const IndexPage = () => (
  <div className={styles.IndexPage}>
    <header className={styles.intro}>
      <img
        src="/me.png"
        alt="Ashlee standing in front of a brick wall looking up to her left and smiling. Her right hand is held up near her right shoulder with the palm facing upwards."
      />
      <div>
        <a href="/">Ashlee M Boyer</a>
        <p>
          Disabled Software Engineer and Web Accessibility Specialist helping
          people learn about accessibility
        </p>
      </div>
    </header>
    <div className={styles.body}>
      <div className={styles.left}>
        <div className={styles.searchAndFeaturedBox}>
          <p>Search</p>
          <Input placeholder="accessibility" icon="search" />
          <p>Featured</p>
          <ul>
            <li>
              <a href="/three-starting-points-for-making-accessible-digital-content">
                Three Starting Points for Making Accessible Digital Content
              </a>
            </li>
            <li>
              <a href="/series/nextjs-firebase-blog">
                Build a Blog Site with Next.js and Firebase
              </a>
            </li>
            <li>
              <a href="/accessible-smooth-scroll-to-top-buttons-with-little-code">
                Accessible, Smooth Scroll-to-top Buttons with Little Code
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.subscribeBox}>
          <p>Subscribe to my newsletter!</p>
          <Input id="subscribe-name" label="Name" placeholder="Ashlee" />
          <Input
            id="subscribe-email"
            label="Email"
            placeholder="hello@ashleemboyer.com"
          />
          <Button onClick={() => console.log('clicked subscribe')}>
            subscribe
          </Button>
        </div>
      </div>
      <div className={styles.right}>
        {posts.map(({ title, excerpt }) => (
          <article>
            <h2>{title}</h2>
            <p>{excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default IndexPage;
