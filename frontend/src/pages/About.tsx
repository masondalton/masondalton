import Layout from '../components/Layout';
import profilePhoto from '../assets/profile.jpg';

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">About</h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <p className="text-text">
                I’m Mason Dalton — an Information Systems graduate student who
                builds data pipelines, cloud infrastructure, and full-stack web
                applications.
              </p>

              <p className="text-text">
                My work sits at the intersection of software, data, and people.
                I build full-stack systems (React, Node, C#, Python, SQL),
                analyze data to understand outcomes, and care a lot about
                clarity, maintainability, and real-world use. Debugging messy
                systems is kind of my thing.
              </p>

              <p className="text-muted">
                I’m currently pursuing a Master of Information Systems
                Management at BYU. Alongside coursework, I've been working as a
                Teaching Assistant for both Business Programming and Machine
                Learning, focusing on practical software development, machine
                learning pipelines, and depoloyment.
              </p>

              <div className="pt-2">
                <p className="text-text font-semibold mb-2">
                  What I’m doing right now
                </p>
                <ul className="space-y-2 text-muted">
                  {/* <li>
                    • TA for Business Programming (Node, Express, Git, debugging
                    workflows)
                  </li> */}
                  <li>
                    • TA for Machine Learning (Python, data prep, models,
                    interpretation)
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-shrink-0">
              <img
                src={profilePhoto}
                alt="Mason Dalton"
                className="w-48 h-48 object-cover border-2 border-border rounded-sm"
                style={{ objectPosition: 'center 22%' }}
              />
              <p className="text-xs text-muted mt-2">
                Using AI. Still human.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-12 pt-8 border-t border-border bg-surface p-6">
          <h2 className="section-header text-2xl font-bold mb-4 text-text">
            What I Build With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-muted">
            <div>
              <p className="font-semibold text-text mb-2">Development</p>
              <ul className="space-y-2">
                <li>• JavaScript (Node.js, Express, React)</li>
                <li>• C# (.NET MVC / APIs)</li>
                <li>• Git and Docker</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-text mb-2">Data & Platforms</p>
              <ul className="space-y-2">
                <li>• Python (Pandas, NumPy, scikit-learn)</li>
                <li>• SQL (MySQL, PostgreSQL), ETL, and REST APIs</li>
                <li>• AWS, Snowflake, and Terraform</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interests */}
        {/* Research & Learning Interests section commented out for employer-focused version */}
        {/*
        <div className="mt-8 pt-8 border-t border-border bg-surface p-6">
          <h2 className="section-header text-2xl font-bold mb-4 text-text">
            Research & Learning Interests
          </h2>
          <ul className="space-y-2 text-muted">
            <li>
              • How cultural perspectives shape technology use, trust, and
              decision-making
            </li>
            <li>
              • Immersive and experiential technologies for training,
              problem-solving, education, brand-building, and sustained positive
              user experiences
            </li>
            <li>
              • Behavior change through technology, including cognitive biases
              and algorithmic design choices that nudge user behavior
            </li>
            <li>
              • AI tools that accelerate workflows and their effects on trust,
              privacy, and organizational decision-making
            </li>
          </ul>
          <p className="text-sm text-muted mt-4">
            Translation: I’m interested in how technology shapes what people
            notice, choose, and trust—and how to design systems that make those
            effects measurable and intentional.
          </p>
        </div>
        */}

        {/* Contact */}
        <div className="mt-8 pt-8 border-t border-border bg-surface p-6">
          <h2 className="section-header text-2xl font-bold mb-4 text-text">
            Contact
          </h2>
          <ul className="space-y-2 text-muted">
            <li>
              <a
                href="mailto:mcoled@byu.edu"
                className="text-primary hover:underline"
              >
                Email: mcoled@byu.edu
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mason-dalton"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/masondalton"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
