import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import AiChat from "@/components/AiChat";


export default function Home() {
  return (
    <main
      className="page-shell"
      style={{
        minHeight: "100svh",
        width: "100%",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        margin: 0,
        position: "relative",
        background: "transparent",
        overflowX: "clip",
      }}
    >

      <Navbar />
      <Hero />
      <Projects />
      <WorkExperience />
      <Skills />
      <Certificates />
      <Contact />
      <AiChat />
    </main>
  );
}
