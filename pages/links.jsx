import { Layout } from "../components";
import styles from "../stylesheets/Pages.module.scss";

const links = [
  {
    label: "Read my Articles",
    href: "https://ashleemboyer.com",
  },
  {
    label: "Support my Work",
    href: "https://support.ashleemboyer.com",
  },
  {
    label: "Subscribe to my Newsletter",
    href: "https://ashleemboyer.com/newsletter",
  },
  {
    label: "Follow me on Twitter",
    href: "https://twitter.com/ashleemboyer",
  },
  {
    label: "Follow me on Twitch",
    href: "https://twitch.tv/ashleemboyer",
  },
  {
    label: "Subscribe on YouTube",
    href: "https://www.youtube.com/channel/UCSU_GS6xScYB5IGBToZQVhQ/videos",
  },
];

const LinksPage = () => (
  <Layout>
    <div className={styles.LinksPage}>
      <h1>
        Hey there!{" "}
        <span role="img" aria-label="waving hand emoji">
          👋
        </span>
      </h1>
      <p>
        I hang out in quite a few places online, and one bio isn't enough room
        for them all. Here are some relevant links to help you find where I keep
        my work!
      </p>
      {links.map(({ href, label }, index) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          key={`link-${index}`}
        >
          {label}
        </a>
      ))}
    </div>
  </Layout>
);

export default LinksPage;
