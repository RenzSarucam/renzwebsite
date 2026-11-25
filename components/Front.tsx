import Image from "next/image";
import { Suspense } from "react";
import portrait from "@/public/images/renz-illustration.jpg";
import { profile, projects } from "@/app/_lib/portfolio-data";
import { getDavaoWeather } from "@/app/_lib/weather";

async function WeatherStat() {
  const weather = await getDavaoWeather();
  return (
    <div>
      <dt>{weather ? `${weather.temp}°C` : "32°C"}</dt>
      <dd className="label">Davao City · {weather ? weather.label : "Light on bugs"}</dd>
    </div>
  );
}

export default function Front() {
  const stats: [string, string][] = [
    [`${projects.length}`, "Projects"],
    ["Global", "Available for remote work"],
    ["Open", "Available for new projects"],
  ];

  return (
    <section className="wrap hero" aria-labelledby="headline">
      <div className="hero-strip label">
        <span>Portfolio</span>
        <span>Web development &amp; deployment</span>
      </div>

      <div className="hero-grid">
        <div className="hero-left">
          <p className="hero-kicker label">Full-Stack Developer · Davao City</p>
          <h1 id="headline" className="hero-title">
            Your idea.<br />Built &amp; deployed.
          </h1>
          <blockquote className="hero-deck">
            I turn business ideas into dependable web applications — with thoughtful design, full-stack development,
            and deployment handled from start to finish.
          </blockquote>
          <p className="hero-byline label">
            {profile.location}
          </p>
          <div className="btn-row">
            <a className="btn btn-solid" href="#work">
              View projects →
            </a>
            <a className="btn" href="#contact">
              Discuss a project
            </a>
          </div>

          <dl className="hero-stats">
            {stats.slice(0, 1).map(([value, caption]) => (
              <div key={value}>
                <dt>{value}</dt>
                <dd className="label">{caption}</dd>
              </div>
            ))}
            <Suspense fallback={<div><dt>—</dt><dd className="label">Davao City · Weather loading</dd></div>}>
              <WeatherStat />
            </Suspense>
            {stats.slice(1).map(([value, caption]) => (
              <div key={value}>
                <dt>{value}</dt>
                <dd className="label">{caption}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="hero-right">
          <figure className="illus">
            <Image
              src={portrait}
              alt={`Illustrated portrait of ${profile.fullName} at his desk`}
              sizes="(max-width: 480px) calc(100vw - 32px), 420px"
              priority
            />
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
