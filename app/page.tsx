import Intro from "@/components/Intro";
import TypeIn from "@/components/TypeIn";
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
      <TypeIn />
      <div className="page">
        <Masthead />
        <Nav />
        <main>
          <Front />
          <Profile />
          <Section id="work" kicker="The Evidence Room" title="Exhibits" sub="Every system, tool and side project on file — all confirmed." page="File 03">
            <Works images={getCaseImages()} />
          </Section>
          <Section id="stack" kicker="Forensics" title="The Lab Report" page="Substances detected on the subject, as of this edition">
            <StackLedger />
          </Section>
          <CollapsibleSection id="career" kicker="Known Whereabouts" title="The Case History" sub="Most recent sighting first." file="File 05">
            <Career />
          </CollapsibleSection>
          <CollapsibleSection id="credentials" kicker="Records" title="Schooling & Clearances" file="File 06">
            <Credentials />
          </CollapsibleSection>
          <Section id="contact" kicker="Get in Touch" title="Open a New Case" sub="Projects, roles, collaborations — or just a hello." page="File 07">
            <Contact />
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}
