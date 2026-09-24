"use client";

import { useCallback, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ChevronDown,
  Hand,
  Ear,
  Heart,
  Brain,
  Mail,
  RotateCcw,
} from "lucide-react";
import Portrait from "@/components/portrait";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projects, type ProjectId } from "@/lib/projects";
import { projectStories, experience } from "@/lib/portfolio-content";

const icons = { hands: Hand, ears: Ear, heart: Heart, brain: Brain };

export default function Home() {
  const [hovered, setHovered] = useState<ProjectId | null>(null);
  const [active, setActive] = useState<ProjectId | null>(null);
  const [reset, setReset] = useState(0);
  const navigate = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    history.pushState(null, "", `#${id}`);
    target.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    target.focus({ preventScroll: true });
  }, []);
  const select = useCallback(
    (id: ProjectId) => {
      setActive(id);
      setHovered(null);
      navigate(`project-${id}`);
    },
    [navigate],
  );
  const preview = projects.find((p) => p.id === hovered);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Gaode Gao home">
          Gaode Gao<span className="brand-mark">✳</span>
        </a>
        <nav aria-label="Main navigation">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="nav-dropdown">
              Projects <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="nav-menu"
              align="end"
              sideOffset={15}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuItem asChild>
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("work");
                  }}
                >
                  All projects <ArrowDown size={15} />
                </a>
              </DropdownMenuItem>
              {projects.map((p) => {
                const Icon = icons[p.id];
                return (
                  <DropdownMenuItem key={p.id} asChild>
                    <a
                      href={`#project-${p.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        select(p.id);
                      }}
                    >
                      <Icon size={17} />
                      <span>{p.title}</span>
                    </a>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="nav-dropdown">
              Experience <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="nav-menu"
              align="end"
              sideOffset={15}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenuItem asChild>
                <a
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("experience");
                  }}
                >
                  Work & leadership
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="#education"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("education");
                  }}
                >
                  Education
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a
            className="resume-nav"
            href="/Gaode-Gao-Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Résumé <ArrowUpRight size={15} />
          </a>
          <a className="contact-link" href="mailto:gaodegao35@gmail.com">
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <section id="home" className="hero" aria-labelledby="intro-title">
        <div className="introduction">
          <p className="intro-role">Product designer & creative developer</p>
          <h1 id="intro-title">
            Hi, I’m Gaode.
            <br />I make learning
            <br />
            feel human.
          </h1>
          <p className="intro-copy">
            I turn curiosity into thoughtful digital experiences—helping people
            learn, communicate, and make sense of the world.
          </p>
          <p className="education">
            Currently at Carnegie Mellon.
            <br />
            <span>Studying learning. Designing what’s next.</span>
          </p>
          <a className="explore-link" href="#work">
            Explore my projects <ArrowDown size={17} />
          </a>
        </div>
        <div className="portrait-space">
          <div className="portrait-caption">
            <span className="caption-star">✳</span>
            <span>A portrait of my work</span>
          </div>
          <Portrait
            hovered={hovered}
            onHover={setHovered}
            onSelect={select}
            reset={reset}
          />
          <div className="portrait-hint">
            <span>Pick a part of me. Explore a project.</span>
            <button
              onClick={() => setReset((r) => r + 1)}
              aria-label="Reset portrait position"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <div
            className={`hover-preview ${preview ? "is-visible" : ""}`}
            aria-live="polite"
          >
            {preview && (
              <>
                <span style={{ color: preview.color }}>
                  {preview.connection}
                </span>
                <strong>{preview.title}</strong>
                <p>{preview.short}</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section
        className="work-section"
        id="work"
        tabIndex={-1}
        aria-labelledby="work-heading"
      >
        <div className="section-intro">
          <div>
            <p className="section-kicker">Selected projects</p>
            <h2 id="work-heading">Curiosity, put into practice.</h2>
          </div>
          <p>
            Four ways I’ve explored how technology can help us connect,
            understand, and learn.
          </p>
        </div>
        <div className="project-jump-list" aria-label="Jump to a project">
          {projects.map((p) => {
            const Icon = icons[p.id];
            return (
              <a
                href={`#project-${p.id}`}
                key={p.id}
                onClick={(e) => {
                  e.preventDefault();
                  select(p.id);
                }}
              >
                <Icon size={18} />
                <span>{p.title}</span>
                <ArrowDown size={14} />
              </a>
            );
          })}
        </div>
        {projects.map((p) => {
          const story = projectStories[p.id];
          const Icon = icons[p.id];
          return (
            <article
              key={p.id}
              id={`project-${p.id}`}
              tabIndex={-1}
              aria-labelledby={`title-${p.id}`}
              className={`project-story story-${p.id} ${active === p.id ? "is-selected" : ""}`}
            >
              <div
                className="project-cover"
                style={
                  { "--cover-color": story.background } as React.CSSProperties
                }
              >
                <div className="cover-heading">
                  <span>
                    <Icon size={19} />
                    {p.title}
                  </span>
                  <span>{story.coverLabel}</span>
                </div>
                <div className={`screenshots screenshots-${p.id}`}>
                  {story.images.length ? (
                    story.images.map((image, i) => (
                      <figure
                        key={image.src}
                        className={`product-shot shot-${i}`}
                      >
                        <div className="window-chrome">
                          <i />
                          <i />
                          <i />
                          <span>{image.label}</span>
                        </div>
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
                                    maxHeight: "none",
                                    left: `${(-image.crop.x / image.crop.width) * 100}%`,
                                    top: `${(-image.crop.y / image.crop.height) * 100}%`,
                                  }
                                : undefined
                            }
                          />
                        </div>
                      </figure>
                    ))
                  ) : (
                    <div className="cover-feature">
                      <Icon size={72} strokeWidth={1} />
                      <p>{story.headline}</p>
                    </div>
                  )}
                </div>
                <p className="cover-caption">{story.caption}</p>
              </div>
              <div className="story-content">
                <p className="project-context">{p.context}</p>
                <h3 id={`title-${p.id}`}>{story.headline}</h3>
                <p className="story-description">{p.description}</p>
                <dl className="story-role">
                  <dt>My role</dt>
                  <dd>{p.role}</dd>
                </dl>
                <h4>Key features</h4>
                <ul className="feature-list">
                  {story.features.map((f) => (
                    <li key={f.title}>
                      <strong>{f.title}</strong>
                      <span>{f.detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="story-links">
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    Explore the project <ArrowUpRight size={16} />
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer">
                      Live experience <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section
        id="experience"
        className="experience-section"
        tabIndex={-1}
        aria-labelledby="experience-heading"
      >
        <div className="section-intro">
          <div>
            <p className="section-kicker">Experience</p>
            <h2 id="experience-heading">A designer who builds.</h2>
          </div>
          <p>
            My work spans learning technology, data, and bringing a product from
            an idea to the people who use it.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((job) => (
            <article key={job.title}>
              <p className="experience-date">{job.date}</p>
              <div>
                <h3>{job.title}</h3>
                <p className="experience-company">{job.company}</p>
              </div>
              <p>{job.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="education"
        className="education-section"
        tabIndex={-1}
        aria-labelledby="education-heading"
      >
        <h2 id="education-heading">Always learning.</h2>
        <div>
          <article>
            <p>Carnegie Mellon University</p>
            <h3>Educational Technology & Applied Learning Sciences</h3>
            <span>
              Master’s · Human–Computer Interaction Institute · Expected Dec.
              2026
            </span>
          </article>
          <article>
            <p>New York University</p>
            <h3>Mathematics</h3>
            <span>Bachelor of Arts · May 2025</span>
          </article>
        </div>
      </section>
      <footer>
        <a className="footer-contact" href="mailto:gaodegao35@gmail.com">
          Let’s make something thoughtful. <ArrowUpRight size={20} />
        </a>
        <div>
          <a href="/Gaode-Gao-Resume.pdf" target="_blank" rel="noreferrer">
            Résumé <ArrowUpRight size={13} />
          </a>
          <a
            href="https://github.com/gaodegao35"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.linkedin.com/in/gaodegao/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a href="mailto:gaodegao35@gmail.com" aria-label="Email Gaode">
            <Mail size={17} />
          </a>
        </div>
      </footer>
    </main>
  );
}
