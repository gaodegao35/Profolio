import type { ProjectId } from "./projects";

type Story = {
  headline: string;
  background: string;
  coverLabel: string;
  caption: string;
  images: {
    src: string;
    alt: string;
    label: string;
    width: number;
    height: number;
    crop?: { x: number; y: number; width: number; height: number };
  }[];
  features: { title: string; detail: string }[];
};
export const projectStories: Record<ProjectId, Story> = {
  hands: {
    headline: "Learning a language with your hands.",
    background: "#dce7fb",
    coverLabel: "Practice, see, improve",
    caption:
      "Real-time fingerspelling practice with feedback that meets the learner where they are.",
    images: [],
    features: [
      {
        title: "Live gesture feedback",
        detail: "Webcam hand tracking makes practice visible in the moment.",
      },
      {
        title: "Progressive scaffolding",
        detail: "Guided letter practice builds toward independent spelling.",
      },
      {
        title: "Adaptive support",
        detail: "Hints and visual cues help learners adjust their gestures.",
      },
    ],
  },
  ears: {
    headline: "Translate the meaning. Keep the feeling.",
    background: "#f2e4da",
    coverLabel: "Language, with intention",
    caption:
      "A translation workspace shaped around tone, relationships, and context.",
    images: [],
    features: [
      {
        title: "Tone and audience",
        detail:
          "Choose how a message should sound for the person receiving it.",
      },
      {
        title: "Four-language communication",
        detail: "Work across Chinese, Korean, English, and Japanese.",
      },
      {
        title: "Compare and revisit",
        detail: "Review translations and return to conversations in context.",
      },
    ],
  },
  heart: {
    headline: "Understand calculus by becoming the teacher.",
    background: "#e0e8dc",
    coverLabel: "Learn by teaching",
    caption:
      "From a real-world scenario to a question, a rubric, and thoughtful feedback.",
    images: [],
    features: [
      {
        title: "Create the question",
        detail: "Choose a mathematical model for a real-world scenario.",
      },
      {
        title: "Build the rubric",
        detail: "Decide what a good answer should demonstrate.",
      },
      {
        title: "Teach an AI student",
        detail: "Evaluate AI-generated reasoning and give targeted feedback.",
      },
    ],
  },
  brain: {
    headline: "Make the logic of accounting click.",
    background: "#e8e2ef",
    coverLabel: "CMU × Yale SOM",
    caption:
      "Connected activities make abstract financial relationships tangible.",
    images: [],
    features: [
      {
        title: "Scenario-based activities",
        detail:
          "Explore accounting concepts through concrete business situations.",
      },
      {
        title: "Connected checkpoints",
        detail:
          "Assess understanding throughout a structured learning sequence.",
      },
      {
        title: "Contextual AI support",
        detail: "Link learner progress to relevant tutoring and feedback.",
      },
    ],
  },
};
export const experience = [
  {
    date: "Feb. 2026 — Present",
    title: "Design Lead & Product Developer",
    company: "Carnegie Mellon University",
    description:
      "Designing AI-powered calculus learning experiences that connect mathematical reasoning, problem creation, and adaptive feedback.",
  },
  {
    date: "Jun. — Aug. 2024",
    title: "Data Analysis Intern",
    company: "China United Network Communications Group",
    description:
      "Analyzed call, SMS, and roaming patterns, developing behavioral features and baseline classification models to support scam-risk analysis.",
  },
  {
    date: "Mar. 2021 — Dec. 2023",
    title: "Founder & Product Developer",
    company: "Independent consumer brand",
    description:
      "Led product strategy, design, production coordination, pricing, and launch operations from concept to market, reaching 20K+ unit sales.",
  },
];

// Actual browser captures from the linked projects. No production accounts or camera access were used.
projectStories.hands.images = [
  {
    src: "/projects/asl-guide.png",
    alt: "ASL Master letter A hand-shape guide and letter practice grid",
    label: "Letter practice",
    width: 379,
    height: 630,
  },
  {
    src: "/projects/asl-levels.png",
    alt: "ASL Master's four progressive practice levels",
    label: "Learning progression",
    width: 278,
    height: 630,
  },
];
projectStories.ears.images = [
  {
    src: "/projects/translator-settings.png",
    alt: "Translator settings for polite speech, tone, and a custom role",
    label: "Tone settings",
    width: 393,
    height: 665,
  },
  {
    src: "/projects/translator-chat.png",
    alt: "Built-in Chinese-to-Korean demo conversation with translated messages",
    label: "Demo conversation",
    width: 393,
    height: 716,
  },
];
projectStories.heart.images = [
  {
    src: "/projects/calculus-question.png",
    alt: "Calculus scenario diagram with function choices and a reasoning field",
    label: "Create the question",
    width: 1104,
    height: 600,
  },
];
projectStories.brain.images = [
  {
    src: "/projects/accounting-map.png",
    alt: "Interactive accounting statement map connecting two balance sheets through cash flow",
    label: "The Statement Map",
    width: 1280,
    height: 1463,
  },
];

// The capture backend adds empty margins; crop only in the presentation layer.
projectStories.hands.images[0].crop = { x: 0, y: 0, width: 197, height: 410 };
projectStories.hands.images[1].crop = { x: 7, y: 0, width: 140, height: 360 };
projectStories.ears.images[0].crop = { x: 0, y: 0, width: 196, height: 350 };
projectStories.ears.images[1].crop = { x: 0, y: 0, width: 196, height: 420 };
projectStories.heart.images[0].crop = { x: 0, y: 0, width: 552, height: 430 };
projectStories.brain.images[0].crop = { x: 90, y: 34, width: 460, height: 573 };
