import { useEffect, useState } from "react";
import React from "react";

export default function App() {
  const taglines = [
    <>
      I create{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
        systems
      </span>{" "}
      that{" "}
      <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
        make sense
      </span>
      .
    </>,
    <>
      Helping teams solve{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
        real
      </span>{" "}
      &{" "}
      <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
        technical
      </span>{" "}
      problems.
    </>,
    <>
      Turning{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
        ideas
      </span>{" "}
      into{" "}
      <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
        working tools
      </span>
      .
    </>,
    <>
      I solve{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
        messy
      </span>{" "}
      and{" "}
      <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
        technical
      </span>{" "}
      problems.
    </>,
    <>
      I make{" "}
      <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
        useful
      </span>{" "}
      things for{" "}
      <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
        real people
      </span>
      .
    </>,
  ];

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const current = React.Children.toArray(taglines[wordIndex].props.children)
      .map((c) => {
        if (typeof c === "string") return c;
        if (React.isValidElement(c)) {
          const element = c as React.ReactElement<{
            children: React.ReactNode;
          }>;
          if (typeof element.props.children === "string") {
            return element.props.children;
          }
        }
        return "";
      })
      .join("");

    let delay = isDeleting ? 50 : 100;

    if (pause) delay = 2000;

    const timeout = setTimeout(() => {
      if (pause) {
        setPause(false);
      } else if (!isDeleting && displayText.length < current.length) {
        setDisplayText(current.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === current.length) {
        setPause(true);
        setIsDeleting(true);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(current.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % taglines.length);
        setPause(true);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, pause]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-950/70 backdrop-blur border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400 inline-block"></span>
            <span className="font-bold">Mason Dalton</span>
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <a className="text-slate-300 hover:text-white" href="#projects">
              Projects
            </a>
            <a className="text-slate-300 hover:text-white" href="#resume">
              Resume
            </a>
            <a className="text-slate-300 hover:text-white" href="#contact">
              Contact
            </a>
            <a className="btn-ghost" href="#get-started">
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="h-[12rem] overflow-hidden relative">
              <h1 className="absolute top-0 left-0 w-full text-4xl md:text-5xl font-extrabold leading-tight">
                {displayText.includes("systems") ? (
                  <>
                    I create{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
                      systems
                    </span>
                    {displayText.slice("I create systems".length)}
                  </>
                ) : displayText.includes("real") &&
                  displayText.includes("technical") ? (
                  <>
                    Helping teams solve{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
                      real
                    </span>{" "}
                    &{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                      technical
                    </span>
                    {displayText.slice(
                      "Helping teams solve real & technical".length
                    )}
                  </>
                ) : displayText.includes("ideas") &&
                  displayText.includes("working tools") ? (
                  <>
                    Turning{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
                      ideas
                    </span>{" "}
                    into{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                      working tools
                    </span>
                    {displayText.slice(
                      "Turning ideas into working tools".length
                    )}
                  </>
                ) : displayText.includes("messy") &&
                  displayText.includes("technical") ? (
                  <>
                    I solve{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
                      messy
                    </span>{" "}
                    and{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                      technical
                    </span>
                    {displayText.slice("I solve messy and technical".length)}
                  </>
                ) : displayText.includes("useful") &&
                  displayText.includes("real people") ? (
                  <>
                    I make{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent">
                      useful
                    </span>{" "}
                    things for{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                      real people
                    </span>
                    {displayText.slice(
                      "I make useful things for real people".length
                    )}
                  </>
                ) : (
                  displayText
                )}
                <span className="blinking-cursor">|</span>
              </h1>
            </div>
            <p className="mt-2 text-slate-300 max-w-prose">
              Tech-minded problem solver with a focus on clarity and usefulness.
              I design, build, and explain tools using cloud platforms, modern
              programming languages, and machine learning—built for real needs,
              not just theory.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                Explore Projects
              </a>
              <a href="#resume" className="btn-ghost">
                Interactive Resume
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="pill">React</span>
              <span className="pill">.NET</span>
              <span className="pill">Postgres</span>
              <span className="pill">Azure</span>
              <span className="pill">Consulting</span>
            </div>
          </div>

          {/* Fun visual */}
          <div className="relative h-72 md:h-96">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400/10 via-slate-900 to-yellow-300/10 border border-slate-800 shadow-sm"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl bg-cyan-500/25 blur-xl"></div>
            <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-yellow-300/25 blur-xl"></div>
            <div className="absolute inset-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm uppercase tracking-widest text-slate-400 mb-2">
                  Live Demo
                </div>
                <div className="text-2xl font-bold">Reporting Automation</div>
                <div className="mt-2 text-slate-500 text-sm">
                  React UI • .NET API • PDF Export
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Data Dashboard",
              tag: "Data",
              desc: "KPIs with filters and exports.",
            },
            {
              title: "Internal Ticketing",
              tag: "Apps",
              desc: "Role-based CRUD workflow.",
            },
            {
              title: "Creative Map",
              tag: "Creative",
              desc: "Interactive visual exploration.",
            },
          ].map((p) => (
            <article key={p.title} className="card p-5">
              <div className="text-xs font-semibold text-cyan-300">{p.tag}</div>
              <h3 className="text-lg font-bold mt-1">{p.title}</h3>
              <p className="text-slate-600 mt-2 text-sm">{p.desc}</p>
              <div className="mt-4 flex items-center gap-2">
                <a className="btn-primary" href="#">
                  View
                </a>
                <a className="btn-ghost" href="#">
                  Case Study
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Resume preview */}
      <section id="resume" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold mb-4">Resume Highlights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { b: "Built data pipeline", s: "Python + SQL; 4× faster refresh" },
            {
              b: "Shipped reporting app",
              s: "React + .NET; 70% less manual work",
            },
            {
              b: "Consulted on tool selection",
              s: "Compared options; recommended low-cost stack",
            },
            {
              b: "Taught & documented",
              s: "Guides that helped others self-serve",
            },
          ].map((r, i) => (
            <div key={i} className="card p-4">
              <div className="font-semibold">• {r.b}</div>
              <div className="text-slate-300 text-sm mt-1">{r.s}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a className="btn-primary" href="#">
            Open Interactive Resume
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-slate-800 bg-slate-950/70 backdrop-blur"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Mason Dalton
          </p>
          <div className="flex gap-3">
            <a className="btn-ghost" href="#">
              LinkedIn
            </a>
            <a className="btn-ghost" href="#">
              GitHub
            </a>
            <a className="btn-primary" href="#">
              Email Me
            </a>
          </div>
        </div>
      </footer>
      <style>{`
        .blinking-cursor {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
