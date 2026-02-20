export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  location?: string;
  type: "education" | "work" | "project";
}
