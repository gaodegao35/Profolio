"use client";

import { useCallback, useEffect, useState } from "react";
import Portrait from "@/components/portrait";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProjectVisual from "@/components/project-visual";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { projects, type ProjectId } from "@/lib/projects";
import { projectSlugs } from "@/lib/project-pages";

export default function Home() {
  const [hovered, setHovered] = useState<ProjectId | null>(null);
  const [active, setActive] = useState<ProjectId | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const select = useCallback(
    (id: ProjectId) => {
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const index = projects.findIndex((p) => p.id === id);
      api?.scrollTo(index, reduced);
      setActive(id);
      setHovered(null);
      document
        .getElementById("work")
        ?.scrollIntoView({
          behavior: reduced ? "instant" : "smooth",
          block: "start",
        });
      document.getElementById(`project-${id}`)?.focus({ preventScroll: true });
      if (location.hash !== `#project-${id}`)
        history.pushState(null, "", `#project-${id}`);
    },
    [api],
  );
  useEffect(() => {
    if (!api) return;
    const followHash = () => {
      const p = projects.find((p) => location.hash === `#project-${p.id}`);
      if (p) select(p.id);
    };
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, [api, select]);

  return (
    <main>
      <SiteHeader />
      <section id="home" className="hero" aria-labelledby="intro-title">
        <div className="introduction">
          <h1 id="intro-title">
            Hi, I’m
            <br />
            Gaode Gao.
          </h1>
          <p className="intro-role">Product Designer & Creative Developer</p>
          <p className="intro-copy">
            I design and build digital products for learning, communication, and
            human–AI interaction.
          </p>
          <p className="intro-copy">
            I’m currently pursuing a master’s in Educational Technology &
            Applied Learning Sciences at Carnegie Mellon University, with a
            background in mathematics from NYU.
          </p>
        </div>
        <div className="portrait-space">
          <Portrait
            hovered={hovered}
            onHover={setHovered}
            onSelect={select}
            reset={0}
          />
        </div>
      </section>
      <section id="work" className="project-gallery" aria-label="Projects">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", containScroll: "trimSnaps" }}
          aria-label="Project thumbnails"
          className="project-carousel"
        >
          <CarouselContent className="project-track">
            {projects.map((p, index) => (
              <CarouselItem
                className="project-slide"
                key={p.id}
                aria-label={`${index + 1} of ${projects.length}: ${p.title}`}
              >
                <a
                  id={`project-${p.id}`}
                  className={`project-card ${active === p.id ? "is-selected" : ""}`}
                  href={`/projects/${projectSlugs[p.id]}`}
                  aria-label={`View ${p.title} project`}
                  onFocus={() => {
                    api?.scrollTo(index, true);
                    setActive(p.id);
                  }}
                >
                  <ProjectVisual id={p.id} />
                  <h2>{p.title}</h2>
                  <p>{p.role}</p>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="carousel-controls">
            <CarouselPrevious className="gallery-arrow" />
            <CarouselNext className="gallery-arrow" />
          </div>
        </Carousel>
      </section>
      <SiteFooter />
    </main>
  );
}
