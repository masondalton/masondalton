import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getFeaturedProjects } from '../data/projects';

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 5);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-l-4 border-primary/40 pl-6 bg-surface">
        <h5 className="text-5xl sm:text-5xl font-bold mb-6 text-text leading-tight">
          I build useful systems and solve data problems
        </h5>
        <p className="text-xl text-muted mb-8 max-w-3xl leading-relaxed">
          I’m a BYU MISM student focused on data engineering, cloud infrastructure,
          and full-stack development. I build scalable systems, design data pipelines,
          and create web applications that solve real business problems. I like
          clear problems, measurable outcomes, and shipping things that actually run.
        </p>
        <Link to="/projects" className="btn-primary text-white">
          View Projects
        </Link>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border bg-surface">
        <h2 className="section-header text-3xl font-bold mb-8">
          Featured Projects
        </h2>
        <div className="space-y-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="border-l-2 border-primary/20 pl-6 py-5 border-b border-border/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
                <div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-2xl font-bold text-text hover:text-primary transition-colors"
                  >
                    {project.title}
                  </Link>
                  <p className="text-muted mt-1">{project.summary}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`text-xs px-3 py-1 border ${
                      project.category === 'technical'
                        ? 'border-primary/50 bg-primary/15 text-primary font-semibold'
                        : 'border-border/40 bg-muted/10 text-muted'
                    }`}
                  >
                    {project.category === 'technical'
                      ? 'Technical'
                      : 'Research'}
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
              </div>
              <Link
                to={`/projects/${project.slug}`}
                className="text-primary hover:underline text-sm font-semibold"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/projects"
            className="text-primary hover:underline font-semibold"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* About Teaser */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <h2 className="section-header text-3xl font-bold mb-6">About</h2>
        <p className="text-lg text-muted mb-4 leading-relaxed max-w-3xl">
          I’m drawn to work that’s useful: turning messy requirements into clean
          systems, and turning data into decisions people can defend. I’m
          production-ready applications with modern web technologies, cloud infrastructure,
          and data-driven approaches.
        </p>
        <Link
          to="/about"
          className="text-primary hover:underline font-semibold"
        >
          Learn more about me →
        </Link>
      </section>
    </Layout>
  );
}
