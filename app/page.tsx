import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import AiChat from "@/components/AiChat";
import ScrollAnimations from "@/components/ScrollAnimations";


export default function Home() {
  return (
    <>
    {/* Instant pre-loader — visible before React hydrates, hidden by LoadingScreen on mount */}
    <div
      id="pre-loader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        background: "#020c1b",
        pointerEvents: "none",
      }}
    />
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

      <LoadingScreen />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <WorkExperience />
      <Skills />
      <Certificates />
      <Contact />
      <AiChat />
      <ScrollAnimations />
    </main>
    </>
  );
}
