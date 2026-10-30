import { contactEmail, githubUrl, linkedinUrl, profile } from "@/app/_lib/portfolio-data";
import TypeFade from "@/components/TypeFade";

const sections: [string, string][] = [
  ["Projects", "#work"],
  ["Skills", "#stack"],
  ["Experience", "#career"],
  ["Education", "#credentials"],
  ["Contact", "#contact"],
];

const iconProps = {
  viewBox: "0 0 24 24",
  width: 22,
  height: 22,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <p className="ft-name"><TypeFade>{profile.fullName}</TypeFade></p>

        <div className="ft-grid">
          <p className="ft-about">
            I&apos;m a full-stack web developer in {profile.location}. My experience covers internal web
            applications, deployment, and the infrastructure that supports them.
          </p>

          <div>
            <h4><TypeFade>Sections</TypeFade></h4>
            <ul className="ft-sections">
              {sections.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4><TypeFade>Contact</TypeFade></h4>
            <ul>
              <li>{profile.location}</li>
              <li>PHT · Remote-first</li>
              <li>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4><TypeFade>Links</TypeFade></h4>
            <ul>
              <li>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href="/resume">Résumé</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <span>© 2026 {profile.fullName} · Davao City, Philippines</span>
          <div className="ft-icons">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg {...iconProps}>
                <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
              </svg>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg {...iconProps}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 11v5M8 8v.01M12 16v-5m0 2.5a2.5 2.5 0 0 1 5 0V16" />
              </svg>
            </a>
            <a href={`mailto:${contactEmail}`} aria-label="Email">
              <svg {...iconProps}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
