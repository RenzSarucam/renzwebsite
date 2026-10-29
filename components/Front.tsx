import { profile, projects } from "@/app/_lib/portfolio-data";
import { getDavaoWeather } from "@/app/_lib/weather";

export default async function Front() {
  const weather = await getDavaoWeather();
  const stats: [string, string][] = [
    [`${projects.length}`, "Projects"],
    // live from Open-Meteo; falls back to the fixed 32°C line if the service can't be reached
    [weather ? `${weather.temp}°C` : "32°C", `Davao City · ${weather ? weather.label : "Light on bugs"}`],
    ["Global", "Available for remote work"],
    ["Open", "Available for new projects"],
  ];

  return (
    <section className="wrap hero" aria-labelledby="headline">
      <div className="hero-strip label">
        <span>Portfolio</span>
        <span>Web development &amp; design</span>
      </div>

      <div className="hero-grid">
        <div className="hero-left">
          <p className="hero-kicker label">Full-Stack Developer · Davao City</p>
          <h1 id="headline" className="hero-title">
{/*  */}            Building software that simplifies work — <em>from idea to deployment.</em>
          </h1>
          <blockquote className="hero-deck">
            I build web applications, manage deployment infrastructure, and help teams make everyday work easier.
          </blockquote>
          <p className="hero-byline label">
            {profile.location}
          </p>
          <div className="btn-row">
            <a className="btn btn-solid" href="#work">
              View my projects →
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
          <figure className="illus">
            <img src="/images/renz-illustration.jpg" alt={`Illustrated portrait of ${profile.fullName} at his desk`} />
            <figcaption className="illus-cap">
              <span>{profile.fullName}</span>
              <span>{profile.location.split(",")[0]}</span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
