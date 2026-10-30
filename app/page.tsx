import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import Front from "@/components/Front";
import Profile from "@/components/Profile";
import Works from "@/components/Works";
import StackLedger from "@/components/StackLedger";
import Career from "@/components/Career";
import CollapsibleSection from "@/components/CollapsibleSection";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getCaseImages } from "@/app/_lib/case-images";

function Section({ id, kicker, title, sub, page, children }: {
  id: string;
  kicker: string;
  title: string;
  sub?: string;
  page: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="kicker">{kicker}</p>
              <h2 className="section-title">{title}</h2>
              {sub && <p className="section-sub">{sub}</p>}
            </div>
            <span className="section-no">{page}</span>
          </div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Intro />
      <div className="page">
        <Masthead />
        <Nav />
        <main>
          <Front />
          <Profile />
          <CollapsibleSection id="work" kicker="Selected Work" title="Projects" sub="Websites, applications, and design projects I’ve built." stickyHeader alwaysOpen>
            <Works images={getCaseImages()} />
          </CollapsibleSection>
          <CollapsibleSection id="stack" kicker="Technical Skills" title="Tools I Use" stickyHeader alwaysOpen>
            <StackLedger />
          </CollapsibleSection>
          <CollapsibleSection id="career" kicker="Work Experience" title="Where I’ve Worked" sub="My roles and projects, starting with the most recent." stickyHeader alwaysOpen>
            <Career />
          </CollapsibleSection>
          <CollapsibleSection id="credentials" kicker="Education & Certificates" title="Education & Certificates" file="Credentials" stickyHeader>
            <Credentials />
          </CollapsibleSection>
          <Section id="contact" kicker="Contact" title="Let’s Work Together" sub="Have a project or role in mind? I’d be glad to hear from you." page="Contact">
            <Contact />
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}
