"use client";
import { useCallback, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Hand,
  Ear,
  Heart,
  Brain,
  Mail,
  RotateCcw,
  Plus,
} from "lucide-react";
import Portrait from "@/components/portrait";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { projects, type ProjectId } from "@/lib/projects";
const icons = { hands: Hand, ears: Ear, heart: Heart, brain: Brain };
export default function Home() {
  const [hovered, setHovered] = useState<ProjectId | null>(null);
  const [selected, setSelected] = useState<ProjectId | null>(null);
  const [reset, setReset] = useState(0);
  const returnFocus = useRef<HTMLElement | null>(null);
  const select = useCallback((id: ProjectId) => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setSelected(id);
  }, []);
  const project = projects.find((p) => p.id === selected);
  const preview = projects.find((p) => p.id === hovered);
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Gaode Gao home">
          gaode gao<span className="brand-mark">✳</span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-work" href="#work">
            Selected work
          </a>
          <a href="/Gaode-Gao-Resume.pdf" target="_blank" rel="noreferrer">
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
            Get to know my work <ArrowDown size={17} />
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
            <span>Hover to discover. Click to explore.</span>
            <button
              onClick={() => setReset((r) => r + 1)}
              aria-label="Reset portrait position"
              title="Reset portrait"
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
        className="selected-work"
        id="work"
        aria-labelledby="work-heading"
      >
        <div className="work-heading">
          <h2 id="work-heading">Different parts of me. One way of thinking.</h2>
          <span>Explore selected work</span>
        </div>
        <div className="project-grid">
          {projects.map((p) => {
            const Icon = icons[p.id];
            return (
              <button
                key={p.id}
                className={`project-button ${hovered === p.id ? "is-active" : ""}`}
                onPointerEnter={() => setHovered(p.id)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                onClick={() => select(p.id)}
                style={{ "--project-color": p.color } as React.CSSProperties}
              >
                <span className="project-icon">
                  <Icon size={23} strokeWidth={1.5} />
                </span>
                <span className="project-button-copy">
                  <span>
                    {p.part} / {p.category}
                  </span>
                  <strong>{p.title}</strong>
                </span>
                <Plus size={17} className="project-plus" />
              </button>
            );
          })}
        </div>
      </section>
      <footer>
        <p>Made with curiosity, by Gaode.</p>
        <div>
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
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            setHovered(null);
          }
        }}
      >
        {project && (
          <DialogContent
            className="project-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              returnFocus.current?.focus();
            }}
          >
            <div
              className="dialog-motif"
              style={
                { "--project-color": project.color } as React.CSSProperties
              }
            >
              {(() => {
                const Icon = icons[project.id];
                return <Icon size={62} strokeWidth={1} />;
              })()}
              <span>{project.connection}</span>
            </div>
            <div className="dialog-body">
              <p className="dialog-category">
                {project.category} · {project.context}
              </p>
              <DialogTitle className="dialog-title">
                {project.title}
              </DialogTitle>
              <DialogDescription className="dialog-description">
                {project.description}
              </DialogDescription>
              <div className="project-role">
                <span>My role</span>
                <strong>{project.role}</strong>
              </div>
              <h3>What I worked on</h3>
              <ul>
                {project.contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="dialog-links">
                <a
                  className="primary-link"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore on GitHub <ArrowUpRight size={17} />
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    View live project <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
