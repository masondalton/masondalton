import { type Project, type ProjectCategory } from '../types/project';

export const projects: Project[] = [
  {
    id: 'movie-recommender',
    slug: 'movie-recommender',
    title: 'Movie Recommender Pipeline',
    summary: 'ML-based recommendation system using collaborative filtering',
    status: 'archived',
    category: 'technical',
    problem:
      'Need to demonstrate full-stack ML implementation with data preprocessing, model training, and serving.',
    approach:
      'Built Python data pipeline with scikit-learn for collaborative filtering, deployed C# API for model serving, and created React UI for user interactions.',
    outcome:
      'Delivered personalized movie recommendations with 85% accuracy. Learned to balance model complexity with deployment constraints.',
    techStack: ['Python', 'scikit-learn', 'Pandas', 'C#', 'React', 'Node.js'],
    links: [
      {
        label: 'LinkedIn Video',
        url: 'https://www.linkedin.com/posts/mason-dalton_following-my-long-standing-trend-of-procrastinating-activity-7409254713679872000-P140?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6xXoQBjuPKlL-AoeTPnJ68I2Un-Uk_0qU',
        placeholder: false,
      },
      { label: 'Demo', url: '#', placeholder: true },
    ],
    screenshots: [], // Placeholder
    learned:
      'Learned to balance model complexity with deployment constraints. Gained experience in data preprocessing pipelines and RESTful API design for ML models.',
    featured: true,
    date: '2024-01-15',
  },
  {
    id: 'volunteer-management',
    slug: 'volunteer-management',
    title: 'Volunteer & Event Management System',
    summary:
      'REST API system for managing volunteer signups and event scheduling',
    status: 'archived',
    category: 'technical',
    problem:
      'Organization needed a scalable system to manage volunteer signups, event scheduling, and participant tracking.',
    approach:
      'Designed and implemented Node.js/Express REST APIs with authentication, data validation, and error handling. Focused on clean architecture and maintainability.',
    outcome:
      'Reduced manual coordination time by 60%. System handles 200+ concurrent users during peak events.',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'AWS', 'Terraform'],
    links: [
      {
        label: 'LinkedIn Video',
        url: 'https://www.linkedin.com/posts/mason-dalton_a-year-ago-i-started-information-systems-activity-7376039077168545792-peTW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6xXoQBjuPKlL-AoeTPnJ68I2Un-Uk_0qU',
        placeholder: false,
      },
    ],
    screenshots: [],
    learned:
      'Gained deep understanding of RESTful API design principles and authentication patterns. Learned importance of input validation and error handling in production systems.',
    featured: true,
    date: '2023-09-10',
  },

  {
    id: 'ml-pipeline-deployment',
    slug: 'ml-pipeline-deployment',
    title: 'ML Pipeline Deployment',
    summary:
      'End-to-end ML pipeline with ETL, model training, Lambda API, and serverless Next.js frontend on AWS',
    status: 'active',
    category: 'technical',
    problem:
      'Demonstrate production-ready ML: schema validation, ETL into a data warehouse, model training, and inference via a serverless API—all orchestrated on AWS with scheduled pipeline runs.',
    approach:
      'Built a Python ETL pipeline (schema validation, warehouse build, scikit-learn training) running in Lambda. Deployed HTTP API via API Gateway and Lambda for inference. Static Next.js frontend consumes the API; both static assets and data/artifacts use S3 with CloudFront. EventBridge triggers the pipeline daily.',
    outcome:
      'Full serverless ML stack: users browse orders, priority queue, and run inference through a clean UI. Data flows from source DB through validation, ETL, training, and inference—all automated and cost-efficient.',
    techStack: [
      'Python',
      'scikit-learn',
      'Next.js',
      'AWS Lambda',
      'API Gateway',
      'S3',
      'EventBridge',
    ],
    links: [
      {
        label: 'View / Test Project',
        url: 'https://www.daltonforge.com/machinelearningpipeline',
        placeholder: false,
      },
    ],
    screenshots: [],
    learned:
      'Gained experience orchestrating serverless ML pipelines, designing APIs for inference, and integrating static frontends with Lambda backends. Learned to structure multi-bucket S3 deployments and manage CORS/API contracts.',
    featured: true,
    date: '2025-01-20',
  },
  {
    id: 'nasa-explorer',
    slug: 'nasa-explorer',
    title: 'NASA Explorer with Wikipedia Integration',
    summary:
      'Interactive web application exploring NASA APIs with automatic Wikipedia definitions for scientific terms',
    status: 'active',
    category: 'technical',
    problem:
      'NASA APIs provide rich scientific data, but complex terminology can be a barrier to understanding. Manually looking up definitions for every scientific term is time-consuming and disrupts the learning flow.',
    approach:
      'Built a React frontend that calls NASA APIs directly from the browser (no backend required!). Implemented client-side rate limiting to protect API endpoints. Integrated Wikipedia REST API to automatically extract and define scientific terms. Created card-based navigation and article-style detail views that seamlessly link scientific terms to their Wikipedia definitions.',
    outcome:
      'Users can explore NASA data across multiple endpoints with automatic context for scientific terminology. The system intelligently identifies and links scientific terms, making complex space science content more accessible. All API calls are made directly from the browser, eliminating the need for a backend server.',
    techStack: ['React', 'TypeScript', 'NASA API', 'Wikipedia API'],
    links: [
      {
        label: 'Explore',
        url: '/projects/nasa-explorer/apod',
        placeholder: false,
      },
    ],
    screenshots: [],
    learned:
      'Gained experience in API integration, rate limiting strategies, and building educational interfaces that reduce cognitive load. Learned to balance API request frequency with user experience, and how to create intuitive navigation patterns for complex data exploration.',
    featured: true,
    date: '2024-12-20',
  },
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured === true);
}

// Helper function to get projects by category
export function getProjectsByCategory(
  category: ProjectCategory | 'all'
): Project[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}
