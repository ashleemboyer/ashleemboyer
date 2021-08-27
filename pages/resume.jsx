import { Icon } from '../components';
import styles from '../stylesheets/resume.module.scss';

const workExperiences = [
  {
    company: 'All Campus',
    location: 'Chicago, Illinois (remote)',
    timeframe: 'Nov 2020 - present',
    title: 'Front-end Web Developer',
    items: [
      'Upgraded webpack from version 4 to version 5, decreasing production build size by 75% (51MB to 13MB) and stabilizing CI builds',
      'Built multiple React hooks for making API requests and easily tracking their loading states to provide better UI/UX feedback for users',
      'Migrated several pages using legacy Redux and React class components to function components written in TypeScript and little to no Redux, enabling the use of React hooks and improving overall performance',
      'Incorporated the use of tools that improve developer experience and the code review process: the Prettier code formatter with CircleCI checks on PRs and the classnames package for conditional styling in custom components',
      'Proposed and created the first integration tests between the frontend and backend repositories to catch breaking changes in PR checks before code is reviewed or merged',
      'Analyzed dozens of project dependencies, created a plan for updating or removing each one, and designed a process for keeping dependencies up to date',
      'Wrote multiple scripts for automating most of the frontend release process using the new GitHub command-line interface',
      'Planned and led the beginning of the migration of test suites from Enzyme to React Testing Library',
    ],
    tech: 'React 16 (Context API, Hooks), TypeScript, Less, Sass, Redux, Jest, Enzyme, React Testing Library, ESLint, Babel, webpack, Storybook, QuillJS, FontAwesome, Syncfusion, AnyChart, Ant, Twilio, Flask, PostgreSQL, Jenkins, CircleCI, Sentry, LogRocket, Jira',
  },
  {
    company: 'Iris Works',
    location: 'Carmel, Indiana',
    timeframe: 'Dec 2019 - Jul 2020',
    title: 'Full-stack Web Developer',
    items: [
      'Migrated from a legacy Rails application to a modern React and Redux application, making it easier to add new features and develop an attractive UI',
      'Created and updated several API endpoints to use Fast JSON API and filter, sort, and paginate data',
      'Onboarded a junior developer with no Rails experience through pair programming and coaching them through their first projects',
      'Led the scoping, estimation, and defintion of work for several epics and small projects',
    ],
    tech: 'React 16 (Hooks), Redux, Sass, Jest, Enzyme, FontAwesome, Ruby & Ruby on Rails, Docker, CircleCI, Clubouse.io, GitLab, MySQL',
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
    tech: 'React 16 (Hooks), Styled Components, Jest, Enzyme, Lodash, Jenkins, Jira',
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
    tech: 'JavaScript, HTML, Sass, PHP, SQL, QuillJS',
  },
  {
    company: 'Delphi Electronics & Safety',
    location: 'Kokomo, Indiana',
    timeframe: 'Jun 2017 - Aug 2017',
    title: 'Software Engineering Intern',
    items: [
      'Increased maintainability and implemented remote commands for an existing web HMI which was used for in-vehicle customer demos and the development of V2X technology',
      'Facilitated collaboration between teams in Troy, Michigan, Kokomo, Indiana, and India',
    ],
    tech: 'JavaScript, HTML, CSS, WebSockets',
  },
  {
    company: 'Delphi Electronics & Safety',
    location: 'Kokomo, Indiana',
    timeframe: 'Jun 2016 - Aug 2016',
    title: 'Software Engineering Intern',
    items: [
      'Researched the Java Security Architecture to calibrate security in a Java Virtual Machine',
      'Developed test Xlets to evaluate security calibrations and API implementations',
    ],
    tech: 'Java, Xlets, JVMs, JARs',
  },
  {
    company: 'Polymer Technology Systems, Inc.',
    location: 'Indianapolis, Indiana',
    timeframe: 'Jun 2015 - Aug 2015',
    title: 'Software Engineering R&D Intern',
    items: [
      'Researched Bluetooth Low Energy technology and how to integrate it with an existing health measurement device',
      'Created an Android Application for demonstration of the BLE device prototype',
    ],
    tech: 'Java, Android, Bluetooth',
  },
];

const skills = [
  'Comfortable with or without frameworks: Bulk of experience is with React, Redux, TypeScript, Jest, Enzyme, and React Testing Library',
  'Specializes in building accessible components and user experiences using WAI-ARIA and WCAG specifications for reference',
  'Approaches debugging with excitement and views fixing bugs as an opportunity for overall product improvement',
  'Prioritizes the developer experience by writing code, tests, documentation, and pull requests that are easy to read, maintain, and extend',
  'Communicates with all levels of expertise in mind so everyone is on the same page and feels included in discussions',
  'Passionate about expanding and maintaining work cultures that prioritize inclusive and accessible policies, psychological safety, and conducive learning through mentorship and coaching',
];

const leadershipExperience = [
  'Co-organizer of local React.Indy meetup (since March 2021)',
  'Co-chair and co-founder of Neurodiversity/Disability ERG at All Campus (since February 2021)',
  '2017-2018 Freshman CSSE mentor',
  'First treasurer for Rose-Hulman’s Feminist Engineers’ Movement',
  '2017 Women & HI Tech’s “Ignite Your Superpower!” exhibitor',
  '2016 Rose-Hulman Leadership Academy graduate',
  '2015 Trailblazer Fellowship Program, one of seven members selected from 200 applications',
];

const speakingExperiences = [
  {
    label:
      '"Accessibility August 2021 on Dev Roulette LIVE" with Stephanie Myers (August 2021)',
    link: 'https://www.youtube.com/watch?v=vWpj7t8I6SM',
  },
  {
    label:
      '"Debugging Semantic HTML Elements for Accessibility" with Ben Myers (released August 2021)',
    link: 'https://someantics.dev/debugging-semantics/',
  },
  {
    label:
      '"Getting started with web accessibility" interview with Kevin Powell (released July 2021)',
    link: 'https://www.youtube.com/watch?v=qr0ujkLLgmE',
  },
  {
    label: '"Building an Accessible Modal" at React.Indy (October 2020)',
    link: 'https://github.com/ashleemboyer/react-indy-20201028#building-an-accessible-modal--reactindy-on-october-28th-2020',
  },
  {
    label: '"Build an Accessible React Component" live-coding series (2020)',
    link: 'https://youtube.com/playlist?list=PLOmKTF_wUDoydvtwWrzEw7DZ9VboV51py',
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
    link: 'https://docs.google.com/presentation/d/1BFY8C3k6Fj70jD4JCMy-XjDRtmDguqQJl7SUR3PXcYg/edit',
  },
];

const ResumePage = () => (
  <div className={styles.ResumePage}>
    <a
      className={styles.pdfLink}
      href="https://drive.google.com/file/d/1409rL4z-SZA5T5pP6OsouVRaOHNdfYby"
    >
      View as PDF
    </a>
    <div>
      <div className={styles.Intro}>
        <img
          src="/me.png"
          alt="Ashlee smiling at the camera and wearing a burnt-orange shirt with small flower blossoms scattered around. She’s wearing brown glasses and is wearing golden-brown eye shadow and black mascara. Her hair is short and wavy with a blonde streak on her right side. The picture has a warm tint."
        />
        <h1>Ashlee M Boyer</h1>
        <p>Disabled Software Engineer and Web Accessibility Specialist</p>
        <div className={styles.contact}>
          <div>
            <Icon name="envelope-square" />
            <a href="mailto:ashleemboyer.dev@gmail.com">
              ashleemboyer.dev@gmail.com
            </a>
          </div>
          <div>
            <Icon name="pen-square" />
            <a href="https://ashleemboyer.com">ashleemboyer.com</a>
          </div>
          <div>
            <Icon name={['fab', 'linkedin']} />
            <a href="https://linkedin.com/in/ashleemboyer">ashleemboyer</a>
          </div>
        </div>
        <p className={styles.pinkBox}>
          My primary focus as a front-end web developer is to make the internet
          a valuable and inclusive experience for everyone. Accessibility isn't
          just something to consider—it's absolutely necessary.
        </p>
      </div>
      <section className={styles.history}>
        <h2>Professional Experience</h2>
        {workExperiences.map(
          ({ company, location, timeframe, title, items }, experienceIndex) => (
            <ul key={`experience-${experienceIndex}`}>
              <li className={styles.purpleBox}>
                <div className={styles.workExperienceHeading}>
                  <h3>{title}</h3>
                  <span>{timeframe}</span>
                </div>
                <p className={styles.workExperienceSubheading}>
                  {company}, {location}
                </p>
                <ul>
                  {items.map((item, itemIndex) => (
                    <li key={`item-${itemIndex}`}>{item}</li>
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
              {skills.map((skill, index) => (
                <li key={`skill-${index}`}>{skill}</li>
              ))}
            </ul>
          </section>
          <section className={styles.pinkBox}>
            <h2>Education</h2>
            <p>
              BS in Software Engineering & Literature Minor, Rose-Hulman
              Institute of Technology (Terre Haute, IN)
            </p>
            <ul>
              <li>Typical CS courses</li>
              <li>Software Quality Assurance</li>
              <li>Project Management</li>
              <li>Requirements Engineering</li>
            </ul>
            <p>Continued learning</p>
            <ul>
              <li>"Epic React" epic course by Kent C. Dodds</li>
              <li>
                "Modern JavaScript Tooling with React" course by Andy Van Slaars
              </li>
              <li>"Design for Developers" course by Sarah Drasner</li>
            </ul>
          </section>
        </div>
        <div>
          <section className={styles.pinkBox}>
            <h2>Leadership Experience</h2>
            <ul>
              {leadershipExperience.map((experience, index) => (
                <li key={`leadershipExperience-${index}`}>{experience}</li>
              ))}
            </ul>
          </section>
          <section className={styles.pinkBox}>
            <h2>Speaking Experience</h2>
            <ul>
              {speakingExperiences.map(({ label, link }, index) => (
                <li key={`speakingExperience-${index}`}>
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
