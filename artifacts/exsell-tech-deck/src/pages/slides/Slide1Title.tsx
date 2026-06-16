export default function Slide1Title() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#0C0F1A", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}
    >
      {/* Orb top-right */}
      <div style={{ position: "absolute", top: "-20vh", right: "-10vw", width: "55vw", height: "55vw", borderRadius: "50%", backgroundColor: "#4F7FFF", opacity: 0.06, filter: "blur(8vw)", pointerEvents: "none" }} />
      {/* Orb bottom-left */}
      <div style={{ position: "absolute", bottom: "-25vh", left: "-12vw", width: "60vw", height: "60vw", borderRadius: "50%", backgroundColor: "#7C6BF0", opacity: 0.07, filter: "blur(10vw)", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "4vw 4vw", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "5vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2vw", height: "2vw", backgroundColor: "#4F7FFF", borderRadius: "0.4vw" }} />
        <span style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "-0.02em" }}>ExSell Academy</span>
      </div>
      <div style={{ position: "absolute", top: "5vh", right: "5vw", fontSize: "1vw", fontWeight: 300, color: "rgba(255,255,255,0.4)", zIndex: 10 }}>
        2026
      </div>

      {/* Centre content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6vw", padding: "0.6vh 1.4vw", backgroundColor: "rgba(79,127,255,0.12)", border: "1px solid rgba(79,127,255,0.3)", borderRadius: "2vw", color: "#4F7FFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4vh" }}>
          Platform Architecture
        </div>

        <h1 style={{ fontSize: "7vw", fontWeight: 800, margin: 0, lineHeight: 1.05, letterSpacing: "-0.04em", textWrap: "balance" }}>
          ExSell Academy
        </h1>

        <p style={{ fontSize: "2vw", fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: "2.5vh 0 0 0", maxWidth: "52vw", lineHeight: 1.45, textWrap: "pretty" }}>
          The platform architecture powering the next generation of sales talent.
        </p>

        {/* Tech pill row */}
        <div style={{ display: "flex", gap: "1.2vw", marginTop: "6vh", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ padding: "0.9vh 1.6vw", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.4vw", fontSize: "1vw", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}>Vite</div>
          <div style={{ padding: "0.9vh 1.6vw", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.4vw", fontSize: "1vw", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}>React</div>
          <div style={{ padding: "0.9vh 1.6vw", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.4vw", fontSize: "1vw", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}>TypeScript</div>
          <div style={{ padding: "0.9vh 1.6vw", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.4vw", fontSize: "1vw", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}>Wouter</div>
          <div style={{ padding: "0.9vh 1.6vw", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.4vw", fontSize: "1vw", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.02em" }}>Tailwind CSS</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "5vh", left: "5vw", fontSize: "0.9vw", fontWeight: 300, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Confidential
      </div>
    </div>
  );
}
