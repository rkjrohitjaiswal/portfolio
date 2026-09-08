// ============================================================
// SKILLS CONFIGURATION
// Grouped by category. No proficiency bars/percentages — those
// are impossible to substantiate honestly.
// ============================================================

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS"],
  },

  {
    id: "backend",
    title: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "MySQL", "Firebase"],
  },
  {
    id: "programming",
    title: "Programming",
    skills: ["Python", "Java", "C"],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    skills: ["AI APIs", "AI Application Development", "LLM Integration", "n8n", "Automation Workflows"],
  },
  {
    id: "tools",
    title: "Tools",
    skills: ["Git", "GitHub", "Vite", "VS Code", "Vercel"],
  },
];
