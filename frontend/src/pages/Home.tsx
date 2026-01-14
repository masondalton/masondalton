import { useEffect, useMemo, useState } from "react";

// Taglines focused on data research and teaching
const TAGLINES: { t: string; hi?: boolean }[][] = [
  [
    { t: "Data-focused " },
    { t: "researcher", hi: true },
    { t: " and " },
    { t: "educator", hi: true },
    { t: " pursuing academic excellence." },
  ],
  [
    { t: "Teaching " },
    { t: "data science", hi: true },
    { t: " while advancing " },
    { t: "research", hi: true },
    { t: " in information systems." },
  ],
];

const STATS = [
  { label: "Students mentored", value: "80+" },
  { label: "Data analysis impact", value: "50%" },
  { label: "GPA (MISM)", value: "3.95" },
];

const SKILL_GROUPS = [
  {
    title: "Data Analysis & ML",
    items: ["Python (Pandas, NumPy, scikit-learn)", "Statistical analysis, EDA", "SQL/PostgreSQL, data modeling"],
  },
  {
    title: "Research Methods",
    items: ["Experimental design", "Data collection & validation", "Academic writing & documentation"],
  },
  {
    title: "Teaching & Mentoring",
    items: ["Curriculum development", "Student mentorship", "Pedagogical approaches"],
  },
  {
    title: "Technical Implementation",
    items: ["Python, Node.js, C#", "AWS, Terraform", "Tableau, data visualization"],
  },
];

const CASE_STUDIES = [
  {
    tag: "ML + Full-Stack",
    title: "Movie Recommender Pipeline",
    stack: "Python (Pandas, scikit-learn), C# API, React UI",
    impact: "Delivered personalized recs; built data prep, model serving, and UI with clear evaluation.",
  },
  {
    tag: "Backend + Cloud",
    title: "Volunteer & Event Management",
    stack: "Node.js (Express), AWS",
    impact: "Shipped REST APIs for signups and scheduling; focused on auth, data integrity, and observability.",
  },
  {
    tag: "CRM & BI",
    title: "Salesforce + Tableau Reporting",
    stack: "Tableau, SQL, Salesforce data",
    impact: "Cut CRM reporting time 50% with exec-ready dashboards and streamlined data prep.",
  },
];

const EXPERIENCE = [
  {
    role: "Teaching Assistant – Business Programming",
    org: "Brigham Young University",
    time: "Sep 2025 – Present",
    bullets: [
      "Mentored 80+ students in programming fundamentals, emphasizing data-driven problem-solving approaches.",
      "Developed curriculum materials focusing on systematic analysis and evidence-based debugging methods.",
    ],
  },
  {
    role: "Consulting Intern / Project Manager",
    org: "Delaware North America (BYU OCI)",
    time: "Sep 2023 – Dec 2023",
    bullets: [
      "Analyzed sales data to reduce reporting time by 50% through statistical analysis and data optimization.",
      "Designed and implemented Tableau dashboards with rigorous data validation and visualization best practices.",
    ],
  },
  {
    role: "Missionary Trainer - Instructor",
    org: "Missionary Training Center",
    time: "Jul 2023 – Apr 2025",
    bullets: [
      "Led instruction for 10–16 students per cohort, applying pedagogical research to improve learning outcomes by 20%.",
      "Developed and refined curriculum based on data-driven feedback and educational research principles.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Brigham Young University – Marriott School of Business",
    degree: "Master of Information Systems Management (STEM)",
    time: "Apr 2027",
    details: ["GPA: 3.95", "Member, Association for Information Systems", "Lead Program Director of Mentorship"],
  },
  {
    school: "Brigham Young University – Marriott School of Business",
    degree: "B.S. Information Systems",
    time: "Apr 2027",
    details: ["Enterprise App Dev, IS Security, Business Programming"],
  },
];
function useTypewriter(segments: { t: string; hi?: boolean }[], speed = 100, backspace = 50, pauseMs = 1400) {
    const fullText = useMemo(() => segments.map((s) => s.t).join(""), [segments]);
    const [idx, setIdx] = useState(0); // number of visible characters
    const [deleting, setDeleting] = useState(false);
    const [pause, setPause] = useState(false);
  
    useEffect(() => {
      let delay = deleting ? backspace : speed;
      if (pause) delay = pauseMs;
  
      const to = setTimeout(() => {
        if (pause) {
          setPause(false);
          return;
        }
        if (!deleting && idx < fullText.length) {
          setIdx((v) => v + 1);
        } else if (!deleting && idx === fullText.length) {
          setPause(true);
          setDeleting(true);
        } else if (deleting && idx > 0) {
          setIdx((v) => v - 1);
        } else if (deleting && idx === 0) {
          setDeleting(false);
          setPause(true);
        }
      }, delay);
  
      return () => clearTimeout(to);
    }, [idx, deleting, pause, fullText, speed, backspace, pauseMs]);
  
    return { idx, deleting };
  }
  
  function Home() {
    const [lineIndex, setLineIndex] = useState(0);
    const segments = TAGLINES[lineIndex];
    const { idx, deleting } = useTypewriter(segments, 90, 40, 1200);
  
    // When a full backspace cycle finishes, advance to next tagline
    useEffect(() => {
      if (!deleting && idx === 0) {
        // Next after a delete cycle ends (guard to avoid advancing on mount)
        setLineIndex((i) => (i + 1) % TAGLINES.length);
      }
    }, [deleting, idx]);
  
    // Render only the visible portion of the current tagline, segment by segment
    const rendered = useMemo(() => {
      let remaining = idx;
      return (
        <>
          {segments.map((seg, i) => {
            if (remaining <= 0) return null;
            const take = Math.min(seg.t.length, remaining);
            const visible = seg.t.slice(0, take);
            remaining -= take;
            if (!seg.hi) return <span key={i}>{visible}</span>;
            // For highlights we add smooth emphasis as the segment completes
            const complete = take === seg.t.length;
            return (
              <span
                key={i}
                className={
                  "highlight-word " + (complete ? "highlight-on" : "highlight-partial")
                }
              >
                {visible}
              </span>
            );
          })}
        </>
      );
    }, [segments, idx]);


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-950/70 backdrop-blur border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-blue-500 inline-block"></span>
            <span className="font-bold">Mason Dalton</span>
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <a className="text-slate-300 hover:text-white" href="#projects">Research</a>
            <a className="text-slate-300 hover:text-white" href="#skills">Skills</a>
            <a className="text-slate-300 hover:text-white" href="#resume">Experience</a>
            <a className="text-slate-300 hover:text-white" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="h-[12rem] overflow-hidden relative">
              <h1 className="absolute top-0 left-0 w-full text-4xl md:text-5xl font-extrabold leading-tight">
                {rendered}
                <span className="blinking-cursor">|</span>
              </h1>
            </div>
            <p className="mt-2 text-slate-300 max-w-prose text-base">
              Information Systems researcher and educator focused on data analysis, statistical methods, and evidence-based teaching. 
              Pursuing academic excellence through rigorous research and effective pedagogy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">Research & Projects</a>
              <a href="mailto:mcoled@byu.edu" className="btn-ghost">Academic Inquiries</a>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-md p-5">
                  <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile visual */}
          <div className="relative h-72 md:h-96">
            <div className="absolute inset-0 rounded-lg bg-slate-900 border border-slate-800 shadow-sm"></div>
            <div className="absolute inset-4 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-sm uppercase tracking-widest text-slate-400 mb-2">Researcher & Educator</div>
                <div className="text-2xl font-bold">Mason Dalton</div>
                <div className="mt-2 text-slate-500 text-sm">Data Analysis · Research · Teaching</div>
                <div className="mt-3 text-slate-400 text-xs">
                  Python · SQL · Statistical Methods · Information Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="text-2xl font-bold mb-4">Research & Projects</h2>
        <p className="text-slate-400 mb-8 max-w-3xl">
          Selected work demonstrating data analysis, research methods, and applied information systems research.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((p, idx) => (
            <article key={p.title} className={`bg-slate-900 border border-slate-800 rounded-lg ${idx === 0 ? 'p-6' : idx === 1 ? 'p-5' : 'p-5'} flex flex-col`}>
              <div className="text-xs font-semibold text-blue-400">{p.tag}</div>
              <h3 className="text-lg font-bold mt-1">{p.title}</h3>
              <p className="text-slate-500 mt-2 text-sm">{p.stack}</p>
              <p className="text-slate-300 mt-3 text-sm flex-1">{p.impact}</p>
              <div className="mt-4 flex items-center gap-2">
                <a className="btn-primary" href="#contact">Details</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold mb-4">Research & Technical Skills</h2>
        <p className="text-slate-400 mb-8 max-w-3xl">
          Core competencies in data analysis, research methodology, teaching, and technical implementation.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, idx) => (
            <div key={group.title} className={`bg-slate-900 border border-slate-800 rounded-md ${idx % 2 === 0 ? 'p-5' : 'p-6'}`}>
              <div className="font-semibold mb-3">{group.title}</div>
              <ul className="text-sm text-slate-300 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 mt-2 rounded-sm bg-blue-400 inline-block flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="resume" className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {EXPERIENCE.map((exp, idx) => (
            <div key={exp.role} className={`bg-slate-900 border border-slate-800 rounded-lg ${idx === 0 ? 'p-6' : 'p-5'}`}>
              <div className="text-xs font-semibold text-blue-400">{exp.time}</div>
              <h3 className="text-lg font-bold mt-1">{exp.role}</h3>
              <p className="text-slate-400 text-sm">{exp.org}</p>
              <ul className="text-slate-300 text-sm mt-4 space-y-2">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 mt-2 rounded-sm bg-blue-500 inline-block flex-shrink-0"></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <a className="btn-primary" href="mailto:mcoled@byu.edu">Research Collaboration</a>
          <a className="btn-ghost" href="https://www.linkedin.com/in/mason-dalton" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, idx) => (
            <div key={edu.degree} className={`bg-slate-900 border border-slate-800 rounded-md ${idx === 0 ? 'p-6' : 'p-5'}`}>
              <div className="text-xs font-semibold text-blue-400">{edu.time}</div>
              <h3 className="text-lg font-bold mt-1">{edu.degree}</h3>
              <p className="text-slate-400 text-sm">{edu.school}</p>
              <ul className="text-slate-300 text-sm mt-3 space-y-1">
                {edu.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 mt-1.5 rounded-sm bg-blue-400 inline-block flex-shrink-0"></span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <a className="btn-primary" href="mailto:mcoled@byu.edu">Request CV</a>
          <a className="btn-ghost" href="https://www.linkedin.com/in/mason-dalton" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Mason Dalton</p>
          <div className="flex gap-3 flex-wrap">
            <a className="btn-ghost" href="https://www.linkedin.com/in/mason-dalton" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn-ghost" href="https://github.com/mcoled" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn-primary" href="mailto:mcoled@byu.edu">Academic Inquiries</a>
            <a className="btn-ghost" href="tel:+15416900266">Call</a>
          </div>
        </div>
      </footer>

      {/* Local styles for type highlight animation */}
      <style>{`
        .blinking-cursor { animation: blink 1s step-start infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        /* Base style for highlight segments while typing */
        .highlight-word {
          background-image: linear-gradient(to right, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% 100%;
          background-position: 0% 50%;
          transition: background-position 500ms ease, filter 500ms ease, opacity 300ms ease;
          filter: brightness(0.9) saturate(0.9);
          opacity: 0.8;
        }
        /* When a highlight finishes typing, subtly "bloom" the color */
        .highlight-on {
          background-position: 100% 50%;
          filter: brightness(1.08) saturate(1.15);
          opacity: 1;
        }
        /* Mid-typing partial word keeps a softer emphasis */
        .highlight-partial { }
      `}</style>
    </div>
  );
}

export default Home;
