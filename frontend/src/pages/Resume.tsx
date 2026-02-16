import Layout from '../components/Layout';
import { experience, education } from '../data/experience';
import { getFeaturedProjects } from '../data/projects';
import { Link } from 'react-router-dom';

export default function Resume() {
  const featuredProjects = getFeaturedProjects().slice(0, 5);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 border-b border-border pb-8">
          <h1 className="text-4xl font-bold mb-4">Mason Dalton</h1>
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-4 gap-y-1 text-muted">
            <a href="tel:+15416900266" className="text-primary hover:underline">
              541.690.0266
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="mailto:mcoled@byu.edu"
              className="text-primary hover:underline"
            >
              mcoled@byu.edu
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://www.linkedin.com/in/mason-dalton"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://github.com/masondalton"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>


        <section className="mb-12 bg-surface p-6 border border-border/50 rounded-sm">
          <h2 className="section-header text-2xl font-bold mb-4 border-b border-border pb-2">
            Skills & Technologies
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Development</h3>
              <p className="text-muted">
                JavaScript (Node.js, Express, React), C# (.NET MVC/API)
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Engineering</h3>
              <p className="text-muted">
                Python (Pandas, NumPy), Tableau, Snowflake, SQL, MySQL, PostgreSQL, ETL, APIs
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cloud & Infrastructure</h3>
              <p className="text-muted">
                AWS, Terraform, Azure ML, GCP, Docker, Git
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Artificial Intelligence</h3>
              <p className="text-muted">
                Machine Learning, ChatGPT Codex, MindStudio, Python Scikit-Learn
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-surface p-6 border border-border/50 rounded-sm">
          <h2 className="section-header text-2xl font-bold mb-4 border-b border-border pb-2">
            Projects
          </h2>
          <ul className="space-y-2">
            {featuredProjects.map((project) => (
              <li key={project.id}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-primary hover:underline font-semibold"
                >
                  {project.title}
                </Link>
                {' — '}
                <span className="text-muted">{project.summary}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 bg-surface p-6 border border-border/50 rounded-sm">
          <h2 className="section-header text-2xl font-bold mb-4 border-b border-border pb-2">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <p className="text-muted">{exp.org}</p>
                  </div>
                  <span className="text-muted text-sm">{exp.time}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted ml-4">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface p-6 border border-border/50 rounded-sm">
          <h2 className="section-header text-2xl font-bold mb-4 border-b border-border pb-2">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-muted">{edu.school}</p>
                  </div>
                  <span className="text-muted text-sm">{edu.time}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted ml-4">
                  {edu.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
