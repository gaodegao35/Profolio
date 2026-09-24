# Portfolio assets

## Real project screenshots

Captured September 24, 2026 from the linked repositories running locally. These are actual interface captures, not generated product mockups. Thumbnail frames are composed in React/CSS.

- ASL Master: letter guide and four-level menu crops. Camera access was not enabled; no webcam or gesture-recognition result is fabricated.
- Four-language Translator: existing `/demo-chat` and `/demo-settings` routes with the repository's built-in sample conversation. No personal chats were used.
- Calculus Teachable Agent: scenario 5 question in the existing instructor preview mode (`?preview=1`). No participant response was submitted and no AI/backend result was invented.
- Instructional Redesign: Module 5's `52-1-The-Statement-Map.html`, cash-flow step. Educational sample figures, not personal financial information.

## Portrait concept

The active asset is `public/gaode-avatar-cute.png`, revised at the user's request for a cuter avatar. It is a 3D-style illustration, not a mesh. Generated with the built-in image-generation tool using this prompt:

> Use case: stylized-concept. Asset: cute personalized character concept for an interactive portfolio and future 3D model. Reference image is the adult user's photograph; preserve her recognizable long center-part warm brown hair, eye shape, small nose/septum/lip jewelry, necklace and white long-sleeve graphic top. Create one adorable premium 3D clay-rendered adult avatar: softly rounded forms, expressive eyes, gently oversized head around one quarter of total height, little rounded hands, warm subtle smile, charming designer vinyl-figure aesthetic. Clearly a stylized adult, not a child; no realistic skin texture or fashion-photography look. Outfit: white graphic long-sleeve top, charcoal loose trousers, chunky white and dark sneakers. Standing front facing, full body including shoes, arms comfortably separated from torso, one hand gently raised at shoulder height, other hand beside hip, ear partially visible. Soft diffused studio lighting, matte materials, cohesive restrained colors. Clean solid pale blue-gray #edf2f9 background. Centered, generous empty margins around silhouette for clickable labels. No checkerboard, no text, no props, no watermark, no platform. Output a single polished cute character raster reference, not a mesh.

The earlier concept is retained below for provenance.

`public/gaode-portrait-concept.png` was generated using the built-in image-generation tool, using the user's second supplied photo as the identity and outfit reference. It is an illustration, not a GLB or other 3D model. The original photos are not committed. Lower-body clothing and the standing pose are illustrative interpretations.

Initial prompt:

> Use case: stylized-concept. Asset type: portfolio interactive portrait illustration and future 3D-model reference. Reference image 1 is the person and outfit reference. Create a polished full-body 3D-rendered stylized character of this same adult person, preserving recognizable facial shape, eyes, long center-part brown hair, small nose/septum/lip jewelry, and necklace. Retain the white long-sleeve graphic top; complete the unseen outfit with simple dark trousers and casual shoes. Friendly natural neutral expression, refined editorial 3D style with realistic proportions and gentle stylization, not a toy or exaggerated cartoon. Standing front view, arms comfortably separated from torso, one hand slightly raised and clearly visible, both hands visible; a little hair tucked behind one ear. Entire person visible including feet with margins. Soft studio light and clean silhouette. Truly transparent background, no room, no scenery, no platform, no letters, labels or watermark. The output is a single raster illustration, not a mesh.

The first output contained a checkerboard rather than real transparency. It was replaced with a second image-generation edit using this prompt:

> Change only the background of the referenced portrait. Remove the entire checkerboard pattern and replace it with a completely solid flat pale blue-gray background color #edf2f9, with no pattern, gradient, texture, shadows, text or props. Preserve the exact same character, identity, face, proportions, pose, clothing, hair, hands and framing unchanged. This will be placed against a website background of #edf2f9. Do not draw a checkerboard. Output one image.
