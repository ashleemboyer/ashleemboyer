import styles from '../stylesheets/resume.module.scss';

const speakingExperiences = [
  '"Build an Accessible React Component" live-coding series (since April 2020)',
  'Accessibility Live Q&A with Kevin Powell (March 2021)',
  '"Building an Accessible Modal" at React.Indy (October 2020)',
  '"Disability in UX" Panel for Twitter (July 2020)',
  '"A Disabled Dev\'s Journey" at The Indianapolis Ruby Brigade (November 2019)',
  'Diversity & Inclusion Panel at Sigstr on (September 2019)',
  '"A Disabled Dev\'s Journey" at IndyPy La Femme Pythonista on (September 2019)',
];

const workExperiences = [
  {
    company: 'All Campus',
    location: 'Chicago, Illinois (remote)',
    timeframe: 'Nov 2020 - present',
    title: 'Front-end Web Developer II',
    items: [
      'Always looking for ways to reduce dependency on Redux by removing it entirely or replacing it with use of the Context API',
      'Upgraded webpack from version 4 to version 5, decreasing production build size by 75% (51M to 13M)',
      'Incorporated the use of several tools packages that improve developer experience - Prettier',
    ],
  },
  {
    company: 'Iris Works',
    location: 'Carmel, Indiana',
    timeframe: 'Dec 2019 - Jul 2020',
    title: 'Full-stack Web Developer',
    items: [
      'Converted multiple pages from using Rails views to using React components and Redux',
      'Created and updated several API endpoints to use Fast JSON API and filter, sort, and paginate data',
      'Paired on a full-stack project with a junior developer for onboarding training',
      'Divided projects into consumable, estimated tasks with thorough descriptions and acceptance criteria',
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

const ResumePage = () => (
  <div className={styles.ResumePage}>
    <svg width="100vw" viewBox="0 0 18 10">
      <polygon fill="#c2185b" points="0,0 0,6 30,0" />
    </svg>
    <div>
      <div className={styles.Intro}>
        <img src="/me.png" />
        <h1>Ashlee M Boyer</h1>
        <p>Disabled Software Engineer and Web Accessibility Specialist</p>
        <p>ashleemboyer.dev@gmail.com</p>
        <p className={styles.pinkBox}>
          My primary focus as a front-end web developer is to make the internet
          a valuable experience for everyone. Accessibility isn't just something
          to consider—it's absolutely necessary.
        </p>
      </div>
      <div className={styles.split}>
        <div>
          <section className={styles.purpleBox}>
            <h2>Education</h2>
            <p>
              BS in Software Engineering, Rose-Hulman Institute of Technology
              (Terre Haute, IN)
            </p>
          </section>
          <section className={styles.purpleBox}>
            <h2>Skills</h2>
            <ul>
              <li>
                Comfortable with or without frameworks: Bulk of experience is
                building with React, Redux, and TypeScript and testing with Jest
                and Enzyme
              </li>
              <li>
                Specializes in building accessible components and user
                experiences using WAI-ARIA and WCAG specifications for reference
              </li>
              <li>
                Approaches debugging with excitement and views fixing bugs as an
                opportunity for learning and overall product improvement
              </li>
            </ul>
          </section>
        </div>
        <div>
          <section className={styles.purpleBox}>
            <h2>Speaking Experience</h2>
            <ul>
              {speakingExperiences.map((experience) => (
                <li>{experience}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <section className={styles.history}>
        <h2>Professional Experience</h2>
        {workExperiences.map(
          ({ company, location, timeframe, title, items }) => (
            <ul>
              <li className={styles.pinkBox}>
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
    </div>
  </div>
);

export default ResumePage;
