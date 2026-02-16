import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProjectBySlug } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Special handling for NASA Explorer - redirect to explorer page
  if (slug === 'nasa-explorer') {
    return <Navigate to="/projects/nasa-explorer/apod" replace />;
  }

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          to="/projects"
          className="text-primary hover:underline mb-6 inline-block"
        >
          ← Back to Projects
        </Link>

        <div className="mb-8 bg-surface p-6 border-l-4 border-primary">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-xs px-3 py-1 border ${
                project.category === 'technical'
                  ? 'border-primary/50 bg-primary/15 text-primary font-semibold'
                  : 'border-border/40 bg-muted/10 text-muted'
              }`}
            >
              {project.category === 'technical' ? 'Technical' : 'Research'}
            </span>
            <span
              className={`text-xs px-2 py-1 border ${
                project.status === 'active'
                  ? 'border-status-active/50 bg-status-active/15 text-status-active'
                  : project.status === 'in-progress'
                  ? 'border-status-progress/50 bg-status-progress/15 text-status-progress'
                  : 'border-status-archived/40 bg-status-archived/10 text-status-archived'
              }`}
            >
              {project.status}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted">{project.summary}</p>
        </div>

        <div className="space-y-8 border-b border-border pb-8">
          <section className="bg-surface p-4">
            <h2 className="text-2xl font-bold mb-3">Problem</h2>
            <p className="text-text leading-relaxed">{project.problem}</p>
          </section>

          <section className="bg-bg p-4">
            <h2 className="text-2xl font-bold mb-3">Approach</h2>
            <p className="text-text leading-relaxed">{project.approach}</p>
          </section>

          <section className="bg-surface p-4">
            <h2 className="text-2xl font-bold mb-3">Outcome</h2>
            {project.outcome ? (
              <p className="text-text leading-relaxed">{project.outcome}</p>
            ) : (
              <p className="text-muted italic">
                Outcome placeholder - to be updated
              </p>
            )}
          </section>
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1 border border-border text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-primary hover:underline"
                >
                  {link.label}
                  {link.placeholder && ' (placeholder)'}
                </a>
              ))}
            </div>
          </section>

          {project.screenshots.length > 0 ? (
            <section>
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="border border-border"
                  />
                ))}
              </div>
            </section>
          ) : (
            <section>
              <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
              <div className="border-2 border-border bg-surface p-12 text-center">
                <p className="text-muted">Screenshot placeholder</p>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-3">What I Learned</h2>
            <p className="text-text leading-relaxed">{project.learned}</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
