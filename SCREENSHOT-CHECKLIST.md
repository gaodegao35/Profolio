# Project case-study screenshots

Each homepage thumbnail opens a dedicated internal project page. The current images are temporary real product previews, not finished case studies. Send a long Figma export per project, or numbered panels in reading order. I can replace the previews without changing the page layout.

## ASL Master

1. Letter practice: target hand shape, your hand in the camera frame, and real detection feedback (only include your face if you want it published).
2. A successful recognition state or progress feedback.
3. The level menu showing the learning progression.
4. A word-spelling activity, preferably showing both the prompt and feedback.

## Four-language Translator

1. Language selection showing the supported directions.
2. Tone settings: politeness/formality, tone choices, and audience or custom role.
3. A complete sample conversation showing source and translated messages.
4. Expanded translation, alternatives, revision, or saved messages—whichever best shows the features you want to highlight.

Use demonstration messages, not private chats, and omit account details.

## Calculus Teachable Agent

1. Real-world scenario with the diagram, function choices, and reasoning input.
2. The rubric-building interface with representative criteria.
3. An AI student's solution and the rubric-based grading interface.
4. Feedback or completion state showing what the learner takes away.

Use instructor preview or demonstration data rather than participant records.

## Accounting Learning Platform

1. Module/course overview showing the learning sequence.
2. The Statement Map connecting opening and closing balance sheets.
3. An interactive cash-flow or equity activity.
4. A checkpoint with feedback; optionally an AI tutor interaction if it is ready to show.

## Figma handoff

- One long case-study layout per project, around 1440 px wide, exported as PNG or WebP. Keep body text readable when the layout is displayed at about 1000 px wide.
- Include the project name, your role, the problem, your design process, and the key screens. Include outcomes only when you can verify them.
- If a layout is very tall, split it into consecutive panels roughly 3000–5000 px high. Use matching widths and names such as `asl-01.png`, `asl-02.png`.
- Send a separate 3:2 thumbnail crop if you want to choose the homepage cover; otherwise I can compose it from the supplied screens.
- Include a brief text description of each panel for accessible image descriptions.

## Integration

Store final assets under `public/case-studies/<project>/`. Add each panel's URL, alt text, width, and height to `caseStudyPanels` in `lib/project-pages.ts`. The detail page renders the images at full width and natural height, without cropping or nested scrolling. Original source screenshots are preserved.
