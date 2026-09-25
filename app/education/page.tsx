import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
export const metadata = { title: "Education — Gaode Gao" };

export default function EducationPage() {
  return (
    <main>
      <SiteHeader />
      <section className="document-page" aria-labelledby="education-title">
        <h1 id="education-title">Education</h1>
        <div className="education-list">
          <article>
            <h2>Carnegie Mellon University</h2>
            <p>Master of Educational Technology & Applied Learning Sciences</p>
            <p>Human–Computer Interaction Institute</p>
            <p>Expected December 2026</p>
          </article>
          <article>
            <h2>New York University</h2>
            <p>Bachelor of Arts in Mathematics</p>
            <p>May 2025</p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
