import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProjectsByCategory } from '../data/projects';
import { type ProjectCategory } from '../types/project';

export default function ProjectsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | 'all'
  >('all');
  const filteredProjects = getProjectsByCategory(selectedCategory);

  const categories: Array<{ value: ProjectCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'technical', label: 'Tools / Technical' },
    // { value: 'research', label: 'Research / Academic' }, // Commented out for employer-focused version
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="section-header text-4xl font-bold mb-8">Projects</h1>

        <div className="mb-8 border-b border-border bg-surface/50 p-4">
          <div className="flex gap-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`pb-3 text-sm transition-colors ${
                  selectedCategory === cat.value
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-muted hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-muted">No projects in this category.</p>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
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
        )}
      </div>
    </Layout>
  );
}
