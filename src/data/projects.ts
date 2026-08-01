export interface Project {
  name: string;
  summary: string;
  type: string;
  url: string;
  featured: boolean;
}

// Add only real, public projects here. Empty projects are hidden from the site.
export const projects: Project[] = [];
