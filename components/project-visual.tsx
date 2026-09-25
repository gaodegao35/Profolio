import { projectStories } from "@/lib/portfolio-content";
import type { ProjectId } from "@/lib/projects";

export default function ProjectVisual({
  id,
  detailed = false,
}: {
  id: ProjectId;
  detailed?: boolean;
}) {
  const story = projectStories[id];
  return (
    <div
      className={`project-visual visual-${id} ${detailed ? "visual-detail" : ""}`}
      style={{ background: story.background }}
    >
      {story.images.map((image) => (
        <div key={image.src} className="visual-frame">
          <div
            className="shot-viewport"
            style={{
              aspectRatio: image.crop
                ? `${image.crop.width}/${image.crop.height}`
                : `${image.width}/${image.height}`,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={image.width}
              height={image.height}
              style={
                image.crop
                  ? {
                      position: "absolute",
                      width: `${(image.width / image.crop.width) * 100}%`,
                      maxWidth: "none",
                      height: "auto",
                      left: `${(-image.crop.x / image.crop.width) * 100}%`,
                      top: `${(-image.crop.y / image.crop.height) * 100}%`,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
