import styles from '../stylesheets/resume.module.scss';

const workExperiences = [
  {
    company: 'All Campus',
    location: 'Chicago, Illinois (remote)',
    timeframe: 'Nov 2020 - present',
    title: 'Front-end Web Developer II',
    items: [
      'Upgraded webpack from version 4 to version 5, decreasing production build size by 75% (51MB to 13MB)',
      'Built multiple React hooks for making API requests and easily tracking their loading states to provide better UI/UX feedback for users',
      'Migrated several pages using legacy Redux and React class components to function components written in TypeScript and little to no Redux, enabling the use of React hooks and improving overall performance',
      'Incorporated the use of tools that improve developer experience and the code review process: the Prettier code formatter with CircleCI checks on PRs and the classnames package for conditional styles',
      'Proposed and created the first integration tests between the frontend and backend repositories to catch breaking changes in PR checks before code is reviewed or merged',
    ],
  },
  {
    company: 'Iris Works',
    location: 'Carmel, Indiana',
    timeframe: 'Dec 2019 - Jul 2020',
    title: 'Full-stack Web Developer',
    items: [
      'Migrated from a legacy Rails application to a modern React and Redux application, making it easier to add new features and develop an attractive UI',
      'Created and updated several API endpoints to use Fast JSON API and filter, sort, and paginate data',
      'Onboarded a junior developer with no Rails experience through pair programming and coached them through their first projects',
      'Led the scoping, estimation, and defintion of work for several epics and small projects',
    ],
  },
  {
    company: 'Sigstr',
    location: 'Indianapolis, Indiana',
    timeframe: 'Jun 2019 — Dec 2019',
    title: 'Front-end Web Developer',
    items: [
      'Built out brand-new React pages and components with accessibility in mind, such as a full-screen modal that allowed users to create email marketing campaigns',
      'Worked with full-stack and back-end developers to plan how the front-end and back-end would effectively interact',
    ],
  },
  {
    company: 'ORS, Inc',
    location: 'Fishers, Indiana',
    timeframe: 'Jun 2018 — May 2019',
    title: 'Front-end Web Developer',
    items: [
      'Completed several patient and non-patient features in a multi-module Electronic Health Record web application',
      'Re-created the patient-side company marketing website from scratch using Vanilla JS',
    ],
  },
];

const speakingExperiences = [
  {
    label:
      '"Build an Accessible React Component" live-coding series (since April 2020)',
    link:
      'https://youtube.com/playlist?list=PLOmKTF_wUDoydvtwWrzEw7DZ9VboV51py',
  },
  {
    label: 'Accessibility Live Q&A with Kevin Powell (March 2021)',
    link: 'https://www.twitch.tv/videos/955311597',
  },
  {
    label: '"Building an Accessible Modal" at React.Indy (October 2020)',
    link:
      'https://github.com/ashleemboyer/react-indy-20201028#building-an-accessible-modal--reactindy-on-october-28th-2020',
  },
  {
    label: '"Disability in UX" Panel for Twitter (July 2020)',
    link: 'https://twitter.com/i/broadcasts/1OwxWLnlrMDKQ',
  },
  {
    label:
      '"A Disabled Dev\'s Journey" at The Indianapolis Ruby Brigade (November 2019)',
    link: 'https://www.youtube.com/watch?v=BOAXrY6G7xA',
  },
  {
    label: 'Diversity & Inclusion Panel at Sigstr on (September 2019)',
    link: 'https://twitter.com/sigstr/status/1171819460841357312',
  },
  {
    label:
      '"A Disabled Dev\'s Journey" at IndyPy La Femme Pythonista on (September 2019)',
    link:
      'https://docs.google.com/presentation/d/1BFY8C3k6Fj70jD4JCMy-XjDRtmDguqQJl7SUR3PXcYg/edit',
  },
];

const ResumePage = () => (
  <div className={styles.ResumePage}>
    <div>
      <div className={styles.Intro}>
        <img
          src="/me.png"
          alt="Ashlee smiling at the camera and wearing a burnt-orange shirt with small flower blossoms scattered around. She’s wearing brown glasses and is wearing golden-brown eye shadow and black mascara. Her hair is short and wavy with a blonde streak on her right side. The picture has a warm tint."
        />
        <h1>Ashlee M Boyer</h1>
        <p>Disabled Software Engineer and Web Accessibility Specialist</p>
        <p>ashleemboyer.dev@gmail.com</p>
        <p className={styles.pinkBox}>
          My primary focus as a front-end web developer is to make the internet
          a valuable and inclusive experience for everyone. Accessibility isn't
          just something to consider—it's absolutely necessary.
        </p>
      </div>
      <section className={styles.history}>
        <h2>Professional Experience</h2>
        {workExperiences.map(
          ({ company, location, timeframe, title, items }) => (
            <ul>
              <li className={styles.purpleBox}>
                <div className={styles.company}>
                  <h3>{company}</h3>
                  <span>{timeframe}</span>
                </div>
                <p className={styles.location}>{location}</p>
                <p className={styles.title}>{title}</p>
                <ul>
                  {items.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </li>
            </ul>
          ),
        )}
      </section>
      <div className={styles.split}>
        <div>
          <section className={styles.pinkBox}>
            <h2>Skills</h2>
            <ul>
              <li>
                Comfortable with or without frameworks: Bulk of experience is
                with React, Redux, TypeScript, Jest, and Enzyme
              </li>
              <li>
                Specializes in building accessible components and user
                experiences using WAI-ARIA and WCAG specifications for reference
              </li>
              <li>
                Approaches debugging with excitement and views fixing bugs as an
                opportunity for overall product improvement
              </li>
              <li>
                Prioritizes the developer experience by writing code, tests,
                documentation, and pull requests that are easy to read,
                maintain, and extend
              </li>
              <li>
                Communicates with all levels of expertise in mind so everyone is
                on the same page and feels included in discussions
              </li>
              <li>
                Passionate about expanding and maintaining work cultures that
                prioritize inclusive and accessible policies, psychological
                safety, and conducive learning through mentorship and coaching
              </li>
            </ul>
          </section>
        </div>
        <div>
          <section className={styles.pinkBox}>
            <h2>Education</h2>
            <p>
              BS in Software Engineering, Rose-Hulman Institute of Technology
              (Terre Haute, IN)
            </p>
          </section>
          <section className={styles.pinkBox}>
            <h2>Volunteer Experience</h2>
            <ul>
              <li>
                Co-organizer of{' '}
                <a href="https://www.meetup.com/React-Indy/" target="_blank">
                  local React.Indy meetup
                </a>{' '}
                (since March 2021)
              </li>
              <li>
                Co-chair and co-founder of Neurodiversity/Disability ERG at
                current company (since February 2021)
              </li>
            </ul>
          </section>
          <section className={styles.pinkBox}>
            <h2>Speaking Experience</h2>
            <ul>
              {speakingExperiences.map(({ label, link }) => (
                <li>
                  {label} [
                  {
                    <a href={link} target="_blank">
                      link
                    </a>
                  }
                  ]
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
);

export default ResumePage;
