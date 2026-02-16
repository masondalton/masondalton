export type ProjectStatus = "active" | "archived" | "in-progress";

export type ProjectCategory = "technical" | "research";

export interface ProjectLink {
  label: string;
  url: string;
  placeholder?: boolean; // For links not yet available
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string; // One-line summary
  status: ProjectStatus;
  category: ProjectCategory;
  problem: string;
  approach: string;
  outcome: string | null; // null if placeholder
  techStack: string[];
  links: ProjectLink[];
  screenshots: string[]; // Image paths/URLs (empty array if placeholder)
  learned: string; // "What I learned" section
  featured?: boolean; // For homepage previews
  date?: string; // Optional date
}
