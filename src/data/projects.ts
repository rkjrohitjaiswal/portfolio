// ============================================================
// PROJECTS CONFIGURATION
// Exactly four projects, by design. Edit URLs/tech as they firm up.
// Leave technologies: [] for a project until the real stack is confirmed —
// do not guess at technologies that were never specified.
// ============================================================

export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl: string | null; // null = not live yet, shows disabled state
  githubUrl: string | null;
  featured: boolean;
  role?: string;
}

export const projects: Project[] = [
  {
    id: "raft-tutor-axis",
    number: "01",
    name: "Raft Tutor Axis",
    category: "EDUCATION · FULL-STACK",
    description:
      "A home-tuition and teacher-placement platform for Muzaffarpur, Bihar, migrated to a full MERN stack with JWT role-based authentication and a Gemini-powered admin console.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Gemini API"],
    image: "/projects/raft-tutor-axis.png",
    liveUrl: "https://www.rafttutoraxis.in/",
    githubUrl: "https://github.com/rkjrohitjaiswal/raft-tutor-axis",
    featured: true,
  },
  {
    id: "ai-social-media-studio",
    number: "02",
    name: "AI Social Media Studio",
    category: "AI · AUTOMATION",
    description:
      "An intelligent content creation suite designed to generate, schedule, and automate social media workflows through custom AI prompt pipelines and workflow automation.",
    technologies: ["React", "Node.js", "Gemini API", "n8n Automation"],
    image: "/projects/ai-social-media-studio.png",
    liveUrl: null,
    githubUrl: "https://github.com/rkjrohitjaiswal/Social-Media-Studio",
    featured: true,
  },
  {
    id: "ai-travel-itinerary-planner",
    number: "03",
    name: "AI Travel Itinerary Planner",
    category: "AI · MERN STACK",
    description:
      "A weather-aware travel planning application built on the MERN stack that generates personalized multi-day itineraries with interactive suggestions and multi-language support.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Gemini API", "Weather API"],
    image: "/projects/ai-travel-itinerary.png",
    liveUrl: null,
    githubUrl: null,
    featured: true,
  },
  {
    id: "bharatedu-ai",
    number: "04",
    name: "BharatEdu AI",
    category: "AI · EDUCATION",
    description:
      "An AI-focused digital education platform engineered to provide personalized learning assistance and adaptive content delivery for students.",
    technologies: ["React", "Node.js", "Gemini API", "Tailwind CSS"],
    image: "/projects/bharatedu-ai.png",
    liveUrl: null,
    githubUrl: null,
    featured: true,
  },
];


