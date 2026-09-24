export type ProjectId = "hands" | "ears" | "heart" | "brain";
export const projects: {
  id: ProjectId;
  part: string;
  title: string;
  category: string;
  connection: string;
  short: string;
  description: string;
  context: string;
  role: string;
  contributions: string[];
  tags: string[];
  color: string;
  repo: string;
  demo?: string;
}[] = [
  {
    id: "hands",
    part: "Hands",
    title: "ASL Master",
    category: "Accessible learning",
    connection: "Hands that connect",
    short: "Making fingerspelling a hands-on learning experience.",
    description:
      "A webcam-based ASL fingerspelling tool that brings real-time hand tracking, adaptive hints, and progressive practice together to help learners build confidence.",
    context: "CMU course project",
    role: "Design & development",
    contributions: [
      "Designed a progression from guided letter practice to independent spelling.",
      "Built hand-tracking interactions with p5.js and MediaPipe.",
      "Iterated on gesture tolerance, visual feedback, and instructional flow.",
    ],
    tags: ["Interaction design", "p5.js", "MediaPipe", "Learning design"],
    color: "#4567c8",
    repo: "https://github.com/gaodegao35/ASL-Master",
  },
  {
    id: "ears",
    part: "Ears",
    title: "Tone-aware Translator",
    category: "Human communication",
    connection: "Ears that understand",
    short: "Because how we say something matters as much as what we say.",
    description:
      "A translation app that adapts to audience, context, and communication intent. Tone selection, comparison, and revision help people find language that feels natural.",
    context: "Independent project",
    role: "Product design & development",
    contributions: [
      "Designed tone selection around audience and communication intent.",
      "Built translation comparison and revision workflows.",
      "Developed the product toward a public release.",
    ],
    tags: ["Product design", "AI translation", "Prototyping"],
    color: "#936635",
    repo: "https://github.com/gaodegao35/Four-language-Translator",
  },
  {
    id: "heart",
    part: "Heart",
    title: "Calculus Teachable Agent",
    category: "Learning by teaching",
    connection: "Heart for learning",
    short: "Helping students understand calculus by becoming the teacher.",
    description:
      "A learning experience that puts students in the role of a calculus teaching assistant: model a real-world scenario, write a rubric, and use it to grade AI-generated student answers.",
    context: "Carnegie Mellon",
    role: "Design lead & product developer",
    contributions: [
      "Designed the workflow from real-world problem creation to rubric-based feedback.",
      "Developed LLM components for scenarios, AI student responses, and adaptive feedback.",
      "Grounded interactions in mathematical reasoning and human–AI collaboration.",
    ],
    tags: ["Next.js", "Human–AI interaction", "Learning science"],
    color: "#b35870",
    repo: "https://github.com/nila-1234/calculus-teachable-agent",
  },
  {
    id: "brain",
    part: "Brain",
    title: "Accounting, Reimagined",
    category: "Making sense of systems",
    connection: "A mind for clarity",
    short: "Turning accounting concepts into connected learning experiences.",
    description:
      "An AI-powered accounting learning platform developed through a CMU capstone with Yale School of Management. Connected activities and assessment checkpoints support contextualized tutoring and feedback.",
    context: "CMU × Yale SOM",
    role: "Product design lead",
    contributions: [
      "Led product design linking learner progress and assessment to AI tutor interactions.",
      "Designed connected activities and assessment checkpoints.",
      "Shaped contextualized feedback and personalized learning support.",
    ],
    tags: ["Learning experience design", "AI tutoring", "Instructional design"],
    color: "#7662af",
    repo: "https://github.com/erikaen/Instructional_Redesign_v2",
    demo: "https://erikaen.github.io/Instructional_Redesign_v2/",
  },
];
