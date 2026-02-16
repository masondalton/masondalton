export interface Experience {
  role: string;
  org: string;
  time: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    role: 'Teaching Assistant – Machine Learning and Business Programming',
    org: 'Brigham Young University, Provo, UT',
    time: 'Sep 2025 – Present',
    bullets: [
      'Mentored 80+ students in Node.js and Express, teaching debugging, modular design, and Git version control',
      'Developed GitHub exercises on logic, syntax, and runtime errors to build strong troubleshooting skills',
      'Guided students through learning with AI tools and developing machine learning pipelines in Python',
    ],
  },
  {
    role: 'Consulting Intern | Project Manager (BYU On-Campus Internship)',
    org: 'Delaware North America, Provo, UT',
    time: 'Sep 2023 – Dec 2023',
    bullets: [
      'Cut CRM reporting time 50% by analyzing sales data and streamlined system improvements via Salesforce',
      'Created executive Tableau dashboards and presentations to accelerate decision-making and clarify outcomes',
      'Led Agile standups and milestone tracking, maintaining 100% on-time delivery for client projects',
    ],
  },
  {
    role: 'Missionary Trainer – Instructor',
    org: 'Missionary Training Center, Provo, UT',
    time: 'Jul 2023 – Apr 2025',
    bullets: [
      'Coached 10–16 new volunteers per cohort through tailored instruction, improving onboarding and team readiness',
      'Enhanced engagement through data-driven lesson adjustments, boosting participation and learning outcomes by 20%.',
      'Led 150+ interactive sessions using experience-based methods, increasing skill retention and collaboration',
    ],
  },
  {
    role: 'Volunteer Representative',
    org: 'The Church of Jesus Christ of Latter-day Saints, New York, Barbados, and St. Maarten',
    time: 'Sept 2020 – Sept 2022',
    bullets: [
      'Participated in local community service projects and humanitarian efforts',
      'Served as a district leader, coordinating training and support for 8–10 volunteers and reporting on key outcomes to area leadership',
      'Adapted communication and teaching approaches to diverse audiences, building cross-cultural and interpersonal skills',
    ],
  },
];

export interface Education {
  school: string;
  degree: string;
  time: string;
  details: string[];
}

export const education: Education[] = [
  {
    school: 'Brigham Young University – Marriott School of Business, Provo, UT',
    degree:
      'Master of Information Systems Management (STEM-Designated Technical Program)',
    time: 'Apr 2027',
    details: [
      'GPA: 3.95',
      'Member of the Association for Information Systems',
      'Relevant Courses: Data Engineering, Cloud Infrastructure',
    ],
  },
  {
    school: 'Brigham Young University – Marriott School of Business, Provo, UT',
    degree: 'Bachelor of Science, Information Systems',
    time: 'Apr 2027',
    details: [
      'Relevant coursework: Enterprise App Dev, Data Networking, Machine Learning, Business Programming',
    ],
  },
];
