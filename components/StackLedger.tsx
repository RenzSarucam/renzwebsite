import { skillGroups } from "@/app/_lib/portfolio-data";

/** Short label shown in the skills table. */
const CODES: Record<string, string> = {
  "React / Next.js": "RNX",
  "HTML / CSS": "HTML",
  TypeScript: "TS",
  "Tailwind CSS": "TWX",
  "shadcn/ui": "SHAD",
  "Figma / Canva": "FIG",
  "Laravel / PHP": "LRV",
  "Node.js / Express": "NODE",
  MySQL: "SQL",
  PostgreSQL: "PG",
  "Python / Django": "PY",
  "Flutter / Dart": "DART",
  "Linux CLI": "LNX",
  "Git / GitHub": "GIT",
  Docker: "DCKR",
  "GitHub Actions": "GHA",
  Nginx: "NGX",
  "CI/CD Automation": "CICD",
  "REST API": "REST",
  "Socket.IO": "SIO",
  "GitHub GraphQL API": "GQL",
  "Firebase API": "FIRE",
  "Supabase API": "SUPA",
  "ODBC / SFTP": "ODBC",
};

const detected = (level: number) => (level >= 90 ? "Daily driver" : level >= 86 ? "Most days" : "In projects");

const finding = (level: number): { label: string; tone: "primary" | "comfortable" | "working" } =>
  level >= 90
    ? { label: "Primary tool", tone: "primary" }
    : level >= 85
      ? { label: "Comfortable", tone: "comfortable" }
      : { label: "Working knowledge", tone: "working" };

const rows = skillGroups
  .flatMap((g) => g.skills.map((s) => ({ ...s, desk: g.category })))
  .sort((a, b) => b.level - a.level);

export default function StackLedger() {
  return (
    <div>
      <div className="lab-scroll">
        <table className="lab">
          <thead>
            <tr>
              <th scope="col">Skill</th>
              <th scope="col" className="lab-code">Short name</th>
              <th scope="col">Usage</th>
              <th scope="col" className="lab-finding">Experience</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const f = finding(r.level);
              return (
                <tr key={r.name}>
                  <td className="lab-name">{r.name}</td>
                  <td className="lab-code">{CODES[r.name] ?? r.name.slice(0, 4).toUpperCase()}</td>
                  <td className="lab-detected">{detected(r.level)}</td>
                  <td className="lab-finding">
                    <span className={`finding finding-${f.tone}`}>
                      {f.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="disclaimer">
        Skill levels are my own estimate, based on the tools I use in my work and projects.
      </p>
    </div>
  );
}
