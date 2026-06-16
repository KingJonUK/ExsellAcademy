export default function Slide5Migration() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#0C0F1A", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}
    >
      <div style={{ position: "absolute", top: "10vh", left: "15vw", width: "40vw", height: "40vw", borderRadius: "50%", backgroundColor: "#7C6BF0", opacity: 0.06, filter: "blur(11vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15vh", right: "5vw", width: "45vw", height: "45vw", borderRadius: "50%", backgroundColor: "#4F7FFF", opacity: 0.05, filter: "blur(9vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "4vw 4vw", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "5vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2vw", height: "2vw", backgroundColor: "#4F7FFF", borderRadius: "0.4vw" }} />
        <span style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "-0.02em" }}>ExSell Academy</span>
      </div>
      <div style={{ position: "absolute", top: "5vh", right: "5vw", fontSize: "1vw", color: "rgba(255,255,255,0.4)", zIndex: 10 }}>04 / 06</div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", height: "100%", padding: "10vh 6vw 8vh" }}>
        <div style={{ display: "inline-block", padding: "0.5vh 1.2vw", backgroundColor: "rgba(124,107,240,0.12)", border: "1px solid rgba(124,107,240,0.3)", borderRadius: "2vw", color: "#7C6BF0", fontSize: "0.9vw", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2.5vh" }}>
          Next.js to Vite Migration
        </div>
        <h2 style={{ fontSize: "4.2vw", fontWeight: 800, margin: "0 0 1.5vh 0", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          A bespoke shim layer bridges the gap.
        </h2>
        <p style={{ fontSize: "1.35vw", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: "0 0 4vh 0", maxWidth: "50vw", lineHeight: 1.5 }}>
          All next/* imports resolve to client-safe shims via Vite aliases — zero changes needed in any page file.
        </p>

        {/* Shim table — two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5vh 3vw", width: "82vw" }}>
          <div style={{ backgroundColor: "#0D111F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.7vw", padding: "1.8vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <span style={{ fontFamily: "monospace", fontSize: "1.05vw", color: "#7C6BF0", fontWeight: 600, flexShrink: 0 }}>next/link</span>
            <div style={{ width: "1px", height: "3vh", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: "1.05vw", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>Wouter &lt;Link&gt; with external-URL fallback to &lt;a&gt;</span>
          </div>
          <div style={{ backgroundColor: "#0D111F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.7vw", padding: "1.8vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <span style={{ fontFamily: "monospace", fontSize: "1.05vw", color: "#4F7FFF", fontWeight: 600, flexShrink: 0 }}>next/image</span>
            <div style={{ width: "1px", height: "3vh", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: "1.05vw", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>Plain &lt;img&gt; — layout props mapped, crossOrigin preserved</span>
          </div>
          <div style={{ backgroundColor: "#0D111F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.7vw", padding: "1.8vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <span style={{ fontFamily: "monospace", fontSize: "1.05vw", color: "#7C6BF0", fontWeight: 600, flexShrink: 0 }}>next/navigation</span>
            <div style={{ width: "1px", height: "3vh", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: "1.05vw", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>useParams · useRouter · useSearchParams · usePathname</span>
          </div>
          <div style={{ backgroundColor: "#0D111F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.7vw", padding: "1.8vh 2vw", display: "flex", alignItems: "center", gap: "1.5vw" }}>
            <span style={{ fontFamily: "monospace", fontSize: "1.05vw", color: "#4F7FFF", fontWeight: 600, flexShrink: 0 }}>next/font</span>
            <div style={{ width: "1px", height: "3vh", backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: "1.05vw", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}>Google Fonts link in index.html, className pass-through</span>
          </div>
        </div>

        <div style={{ marginTop: "3.5vh", padding: "1.5vh 2vw", backgroundColor: "rgba(79,127,255,0.08)", border: "1px solid rgba(79,127,255,0.2)", borderRadius: "0.7vw", fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.6)" }}>
          All shims aliased in{" "}
          <span style={{ fontFamily: "monospace", color: "#4F7FFF", fontWeight: 600 }}>vite.config.ts</span>
          {" "}— page files required zero framework-specific edits.
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "5vh", left: "5vw", fontSize: "0.9vw", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Confidential</div>
    </div>
  );
}
