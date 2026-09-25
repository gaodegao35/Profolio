import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProjectVisual from "@/components/project-visual";
import { projects } from "@/lib/projects";
import { projectSlugs, caseStudyPanels } from "@/lib/project-pages";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlugs[p.id] }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => projectSlugs[p.id] === slug);
  return {
    title: project
      ? `${project.title} — Gaode Gao`
      : "Project not found — Gaode Gao",
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => projectSlugs[p.id] === slug);
  if (index < 0) notFound();
  const project = projects[index],
    next = projects[(index + 1) % projects.length],
    panels = caseStudyPanels[project.id];
  return (
    <main>
      <SiteHeader />
      <article className="document-page case-page">
        <a className="case-back" href={`/#project-${project.id}`}>
          Back to Projects
        </a>
        <header className="case-header">
          <h1>{project.title}</h1>
          <p className="case-role">{project.role}</p>
        </header>
        <div className="case-gallery">
          {panels.length ? (
            <div className="case-study-panels">
              {panels.map((panel, index) => (
                <img
                  key={panel.src}
                  src={panel.src}
                  alt={panel.alt}
                  width={panel.width}
                  height={panel.height}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
          ) : (
            <ProjectVisual id={project.id} detailed />
          )}
        </div>
        <nav className="case-next" aria-label="Project navigation">
          <a href="/#work">All Projects</a>
          <a href={`/projects/${projectSlugs[next.id]}`}>
            Next Project: {next.title}
          </a>
        </nav>
      </article>
      <SiteFooter />
    </main>
  );
}
