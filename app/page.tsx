import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100svh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 0,
          overflow: "hidden",
          background: "transparent",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
