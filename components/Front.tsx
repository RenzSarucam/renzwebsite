import { profile, projects } from "@/app/_lib/portfolio-data";

const stats: [string, string][] = [
  [`No. ${projects.length}`, "Exhibits on file"],
  ["32°C", "Davao City · light on bugs"],
  ["Global", "Jurisdiction · remote-friendly"],
  ["Open", "Status · taking new cases"],
];

export default function Front() {
  return (
    <section className="wrap hero" aria-labelledby="headline">
      <div className="hero-strip label">
        <span>Front Page</span>
        <span>Filed under: Open Investigations</span>
      </div>

      <div className="hero-grid">
        <div className="hero-left">
          <p className="hero-kicker label">Case No. 2023-RS — Findings Published</p>
          <h1 id="headline" className="hero-title">
            A Davao City developer who builds the whole thing — <em>from database to deploy.</em>
          </h1>
          <blockquote className="hero-deck">
            {profile.firstName} builds full-stack web applications for DSG Son&apos;s Group Inc., manages Docker
            infrastructure and CI/CD pipelines, and creates scalable, reliable, and user-focused digital solutions.
          </blockquote>
          <p className="hero-byline label">
            By <b>The Detective Desk</b> · Reporting from {profile.location.split(",")[0]}, between deploys
          </p>
          <div className="btn-row">
            <a className="btn btn-solid" href="#work">
              Open the evidence →
            </a>
            <a className="btn" href="#contact">
              Get in touch
            </a>
          </div>

          <dl className="hero-stats">
            {stats.map(([value, caption]) => (
              <div key={value}>
                <dt>{value}</dt>
                <dd className="label">{caption}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="hero-right">
          <figure className="wanted">
            <p className="wanted-title">Wanted</p>
            <p className="wanted-sub label">For building the whole thing</p>
            <div className="wanted-photo">
              <img src="/images/renz-profile.jpg" alt={`Portrait of ${profile.fullName}`} />
            </div>
            <figcaption className="wanted-info">
              <p className="wanted-name">{profile.fullName}</p>
              <p className="wanted-alias">Alias: Renz · Last seen: {profile.location.split(",")[0]}</p>
              <dl className="wanted-facts">
                <div>
                  <dt>Wanted for</dt>
                  <dd>Laravel · React · Docker · CI/CD</dd>
                </div>
                <div>
                  <dt>Reward</dt>
                  <dd>One good project</dd>
                </div>
              </dl>
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
