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
              {profile.fullName} is a full-stack web developer known to operate out of {profile.location}. Since April 2026 they have
              worked as a Research &amp; Development Engineer at DSG Son&apos;s Group Inc., designing and deploying
              multi-project server infrastructure with Docker and Docker Compose, and building the internal web
              applications that several business units depend on every day.
            </p>
            <p>
              The day job is a mix of Laravel, React and Next.js on the application side and Linux, Nginx and GitHub
              Actions self-hosted runners on the delivery side. Every system goes through separate testing and production
              environments, with shared database architecture and monitoring to keep them honest.
            </p>
            <p>
              Before that came a run of remote engagements for clients in Australia and the United States — a
              responsive web application, and a full-stack business management platform with role-based access — plus
              earlier UI/UX and mobile work in Figma, React Native and Flutter. A {profile.degree} from{" "}
              {profile.college} ({profile.graduationYear}) holds it all together.
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
