import { profile } from "@/app/_lib/portfolio-data";
import Reveal from "@/components/Reveal";

export default function Profile() {
  return (
    <section id="profile" className="section">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="kicker">Witness Statement</p>
              <h2 className="section-title">Subject Profile</h2>
            </div>
            <span className="section-no">File 02</span>
          </div>

          <div className="profile-cols">
            <p>
              I&apos;m {profile.firstName}, a full-stack web developer based in {profile.location}.
              I build web applications that help teams manage their day-to-day work. As a Research &amp;
              Development Engineer at DSG Son&apos;s Group Inc., I develop internal systems across
              multiple business units and manage the infrastructure behind them.
            </p>
            <p>
              My work spans the interface, backend and deployment, using Laravel, React and Next.js.
              I set up Docker environments, maintain Linux servers and Nginx, and automate releases
              with GitHub Actions. I also keep testing separate from production and maintain the
              applications and databases that support each system.
            </p>
            <p>
              I&apos;ve worked remotely with clients in Australia and the United States, building web
              applications and business management systems around their workflows. My background in
              UI/UX design and mobile development helps me connect the technical details with how
              people use a product, from the first screen to the tasks they need to finish.
            </p>
          </div>

          <blockquote className="pull">
            Following every lead, from the first screen to the final deployment.
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
