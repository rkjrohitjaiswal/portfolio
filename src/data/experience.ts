// ============================================================
// EXPERIENCE CONFIGURATION
// No invented employment history. Where exact dates/titles are not
// confirmed, the "period" field is left as an editable placeholder —
// update it rather than guessing.
// ============================================================

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string; // TODO: confirm exact dates before publishing
  description: string;
  type: "experience" | "freelance";
}

export const experience: ExperienceItem[] = [
  {
    id: "data-annotation",
    role: "Data Annotation Contributor",
    org: "Handshake",
    period: "Recent",
    description:
      "Contributed to structured data annotation work, producing verifiable, research-backed outputs to defined project guidelines.",
    type: "experience",
  },
];

export const freelanceWork: ExperienceItem[] = [
  {
    id: "raft-tutor-axis",
    role: "Full-Stack Developer",
    org: "Raft Tutor Axis",
    period: "Project-based",
    description:
      "Designed and built a home tuition and teacher placement platform on the MERN stack, including MongoDB data models, JWT authentication, an AI-assisted chat layer, and role-based admin routes.",
    type: "freelance",
  },
  {
    id: "automation-workflows",
    role: "Automation Developer",
    org: "Independent",
    period: "Ongoing",
    description:
      "Built n8n automation workflows connecting AI APIs, cloud storage, and spreadsheets to reduce repetitive manual work across content and reporting tasks.",
    type: "freelance",
  },
];
