import type { ProjectId } from "./projects";

export const projectSlugs: Record<ProjectId, string> = {
  hands: "asl-master",
  ears: "four-language-translator",
  heart: "calculus-teachable-agent",
  brain: "accounting-learning-platform",
};

export type CaseStudyPanel = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
// Add the user's exported Figma panels here, in reading order. Images render
// at their natural aspect ratio without cropping or an inner scroll container.
export const caseStudyPanels: Record<ProjectId, CaseStudyPanel[]> = {
  hands: [],
  ears: [],
  heart: [],
  brain: [],
};
