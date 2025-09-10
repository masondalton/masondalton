import React, { useEffect, useMemo, useState } from "react";

// Segment-based taglines so we can smoothly emphasize highlight words
// Each tagline is an array of segments: { t: string; hi?: boolean }
const TAGLINES: { t: string; hi?: boolean }[][] = [
  [
    { t: "I create " },
    { t: "systems", hi: true },
    { t: " that " },
    { t: "make sense", hi: true },
    { t: "." },
  ],
  [
    { t: "Helping teams solve " },
    { t: "real", hi: true },
    { t: " & " },
    { t: "technical", hi: true },
    { t: " problems." },
  ],
  [
    { t: "Turning " },
    { t: "ideas", hi: true },
    { t: " into " },
    { t: "working tools", hi: true },
    { t: "." },
  ],
  [
    { t: "I solve " },
    { t: "messy", hi: true },
    { t: " and " },
    { t: "technical", hi: true },
    { t: " problems." },
  ],
  [
    { t: "I make " },
    { t: "useful", hi: true },
    { t: " things for " },
    { t: "real people", hi: true },
    { t: "." },
  ],
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
            <span className="h-3 w-3 rounded-full bg-cyan-400 inline-block"></span>
            <span className="font-bold">Mason Dalton</span>
          </div>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <a className="text-slate-300 hover:text-white" href="#projects">Projects</a>
            <a className="text-slate-300 hover:text-white" href="#resume">Resume</a>
            <a className="text-slate-300 hover:text-white" href="#contact">Contact</a>
            <a className="btn-ghost" href="#get-started">Get Started</a>
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
            <p className="mt-2 text-slate-300 max-w-prose">
              Tech-minded problem solver with a focus on clarity and usefulness. I design, build,
              and explain tools using cloud platforms, modern programming languages, and
              machine learning—built for real needs, not just theory.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">Explore Projects</a>
              <a href="#resume" className="btn-ghost">Interactive Resume</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="pill">Web Dev</span>
              <span className="pill">MVC</span>
              <span className="pill">Database</span>
              <span className="pill">Cloud</span>
              <span className="pill">Business</span>
            </div>
          </div>

          {/* Fun visual */}
          <div className="relative h-72 md:h-96">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400/10 via-slate-900 to-yellow-300/10 border border-slate-800 shadow-sm"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl bg-cyan-500/25 blur-xl"></div>
            <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-yellow-300/25 blur-xl"></div>
            <div className="absolute inset-6 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm uppercase tracking-widest text-slate-400 mb-2">Live Demo</div>
                <div className="text-2xl font-bold">Reporting Automation</div>
                <div className="mt-2 text-slate-500 text-sm">React UI • .NET API • PDF Export</div>
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
            { title: "Data Dashboard", tag: "Data", desc: "KPIs with filters and exports." },
            { title: "Internal Ticketing", tag: "Apps", desc: "Role-based CRUD workflow." },
            { title: "Creative Map", tag: "Creative", desc: "Interactive visual exploration." },
          ].map((p) => (
            <article key={p.title} className="card p-5">
              <div className="text-xs font-semibold text-cyan-300">{p.tag}</div>
              <h3 className="text-lg font-bold mt-1">{p.title}</h3>
              <p className="text-slate-600 mt-2 text-sm">{p.desc}</p>
              <div className="mt-4 flex items-center gap-2">
                <a className="btn-primary" href="#">View</a>
                <a className="btn-ghost" href="#">Case Study</a>
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
            { b: "Shipped reporting app", s: "React + .NET; 70% less manual work" },
            { b: "Consulted on tool selection", s: "Compared options; recommended low-cost stack" },
            { b: "Taught & documented", s: "Guides that helped others self-serve" },
          ].map((r, i) => (
            <div key={i} className="card p-4">
              <div className="font-semibold">• {r.b}</div>
              <div className="text-slate-300 text-sm mt-1">{r.s}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a className="btn-primary" href="#">Open Interactive Resume</a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Mason Dalton</p>
          <div className="flex gap-3">
            <a className="btn-ghost" href="#">LinkedIn</a>
            <a className="btn-ghost" href="#">GitHub</a>
            <a className="btn-primary" href="#">Email Me</a>
          </div>
        </div>
      </footer>

      {/* Local styles for type highlight animation */}
      <style>{`
        .blinking-cursor { animation: blink 1s step-start infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        /* Base style for highlight segments while typing */
        .highlight-word {
          background-image: linear-gradient(to right, #22d3ee, #fde047);
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