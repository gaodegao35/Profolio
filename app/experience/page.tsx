import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { experience } from "@/lib/portfolio-content";
export const metadata = { title: "Work Experience — Gaode Gao" };

export default function ExperiencePage() {
  return (
    <main>
      <SiteHeader />
      <section className="document-page" aria-labelledby="experience-title">
        <h1 id="experience-title">Work Experience</h1>
        <div className="experience-list">
          {experience.map((job) => (
            <article key={job.title}>
              <p className="experience-date">{job.date}</p>
              <div>
                <h2>{job.title}</h2>
                <p>{job.company}</p>
                <p>{job.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
