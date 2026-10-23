import { certificates, education } from "@/app/_lib/portfolio-data";

export default function Credentials() {
  return (
    <div className="cred-grid">
      <div className="cred-col">
        <h3 className="cred-h">Education</h3>
        {education.map((e) => (
          <div className="edu" key={e.school}>
            <small>
              {e.level} · {e.period}
            </small>
            <b>{e.degree}</b>
            <span>{e.school}</span>
            {e.status !== "Completed" && <small>{e.status}</small>}
          </div>
        ))}
      </div>
      <div className="cred-col">
        <h3 className="cred-h">Clearances &amp; Commendations</h3>
        {certificates.map((c) => (
          <a className="cert" key={c.title} href={c.image} target="_blank" rel="noopener noreferrer">
            <b>{c.title}</b>
            <span>{c.issuer}</span>
            <em>{c.year}</em>
          </a>
        ))}
      </div>
    </div>
  );
}
