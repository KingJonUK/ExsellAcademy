export default function Slide2PlatformOverview() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#0C0F1A", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}
    >
      <div style={{ position: "absolute", top: "-15vh", right: "-8vw", width: "50vw", height: "50vw", borderRadius: "50%", backgroundColor: "#4F7FFF", opacity: 0.05, filter: "blur(8vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20vh", left: "-10vw", width: "55vw", height: "55vw", borderRadius: "50%", backgroundColor: "#7C6BF0", opacity: 0.06, filter: "blur(10vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "4vw 4vw", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "5vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2vw", height: "2vw", backgroundColor: "#4F7FFF", borderRadius: "0.4vw" }} />
        <span style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "-0.02em" }}>ExSell Academy</span>
      </div>
      <div style={{ position: "absolute", top: "5vh", right: "5vw", fontSize: "1vw", color: "rgba(255,255,255,0.4)", zIndex: 10 }}>01 / 06</div>

      {/* Main content — two columns */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", height: "100%", padding: "0 6vw", gap: "6vw", paddingTop: "10vh" }}>
        {/* Left */}
        <div style={{ flex: "0 0 40vw", display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ display: "inline-block", alignSelf: "flex-start", padding: "0.5vh 1.2vw", backgroundColor: "rgba(79,127,255,0.12)", border: "1px solid rgba(79,127,255,0.3)", borderRadius: "2vw", color: "#4F7FFF", fontSize: "0.9vw", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Platform Overview
          </div>
          <h2 style={{ fontSize: "4.2vw", fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Client-side SPA.
            <span style={{ display: "block", color: "rgba(255,255,255,0.45)" }}>No server required.</span>
          </h2>
          <p style={{ fontSize: "1.4vw", fontWeight: 300, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.55, maxWidth: "36vw", textWrap: "pretty" }}>
            Migrated from Next.js App Router to a fully client-only React SPA — deployed as a static bundle anywhere, including directly on Replit.
          </p>
        </div>

        {/* Right — stacked feature rows */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          <div style={{ backgroundColor: "#131726", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.8vw", padding: "2vh 2vw", display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
            <div style={{ width: "0.35vw", height: "100%", minHeight: "4vh", backgroundColor: "#4F7FFF", borderRadius: "2px", flexShrink: 0, marginTop: "0.3vh" }} />
            <div>
              <div style={{ fontSize: "1.3vw", fontWeight: 700, marginBottom: "0.5vh" }}>Vite</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>Lightning-fast dev server and optimised production builds</div>
            </div>
          </div>
          <div style={{ backgroundColor: "#131726", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.8vw", padding: "2vh 2vw", display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
            <div style={{ width: "0.35vw", height: "100%", minHeight: "4vh", backgroundColor: "#7C6BF0", borderRadius: "2px", flexShrink: 0, marginTop: "0.3vh" }} />
            <div>
              <div style={{ fontSize: "1.3vw", fontWeight: 700, marginBottom: "0.5vh" }}>Wouter</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>Lightweight SPA routing — ~1.5 KB, hooks-first API</div>
            </div>
          </div>
          <div style={{ backgroundColor: "#131726", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.8vw", padding: "2vh 2vw", display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
            <div style={{ width: "0.35vw", height: "100%", minHeight: "4vh", backgroundColor: "#4F7FFF", borderRadius: "2px", flexShrink: 0, marginTop: "0.3vh" }} />
            <div>
              <div style={{ fontSize: "1.3vw", fontWeight: 700, marginBottom: "0.5vh" }}>TanStack Query</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>Async state management — ready to connect to any API</div>
            </div>
          </div>
          <div style={{ backgroundColor: "#131726", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.8vw", padding: "2vh 2vw", display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
            <div style={{ width: "0.35vw", height: "100%", minHeight: "4vh", backgroundColor: "#7C6BF0", borderRadius: "2px", flexShrink: 0, marginTop: "0.3vh" }} />
            <div>
              <div style={{ fontSize: "1.3vw", fontWeight: 700, marginBottom: "0.5vh" }}>Tailwind CSS + Radix UI</div>
              <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>Accessible, branded components with a design-token system</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "5vh", left: "5vw", fontSize: "0.9vw", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Confidential</div>
    </div>
  );
}
