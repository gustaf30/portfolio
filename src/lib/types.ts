export interface Project {
  slug: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export interface SkillCategory {
  key: string;
  skills: string[];
}

export interface TimelineEvent {
  key: string;
  type: "education" | "work" | "project";
}
