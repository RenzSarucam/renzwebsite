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
              I&apos;m {profile.firstName}, a full-stack web developer based in {profile.location}. I joined
              DSG Son&apos;s Group Inc. as a Research &amp; Development Engineer in April 2026.
              I build internal web applications for our business units and manage the servers they run on.
            </p>
            <p>
              Most of my work involves Laravel, React and Next.js. I also set up Docker containers,
              maintain Linux servers and Nginx, and automate deployments with GitHub Actions.
              Part of the job is keeping testing and production environments separate and checking
              that the applications and databases are running properly.
            </p>
            <p>
              I&apos;ve also worked remotely with clients in Australia and the United States on web applications
              and business management systems. My earlier work includes UI/UX design and mobile app development.
              I graduated from {profile.college} in {profile.graduationYear} with a {profile.degree}.
            </p>
          </div>

          <blockquote className="pull">
            Prime suspect in the containerising of everything in sight.
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
