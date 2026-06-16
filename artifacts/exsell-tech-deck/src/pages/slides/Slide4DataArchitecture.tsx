export default function Slide4DataArchitecture() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#0C0F1A", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}
    >
      <div style={{ position: "absolute", top: "-10vh", right: "-5vw", width: "50vw", height: "50vw", borderRadius: "50%", backgroundColor: "#4F7FFF", opacity: 0.05, filter: "blur(9vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15vh", left: "-8vw", width: "55vw", height: "55vw", borderRadius: "50%", backgroundColor: "#7C6BF0", opacity: 0.06, filter: "blur(10vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "4vw 4vw", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "5vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2vw", height: "2vw", backgroundColor: "#4F7FFF", borderRadius: "0.4vw" }} />
        <span style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "-0.02em" }}>ExSell Academy</span>
      </div>
      <div style={{ position: "absolute", top: "5vh", right: "5vw", fontSize: "1vw", color: "rgba(255,255,255,0.4)", zIndex: 10 }}>03 / 06</div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", height: "100%", padding: "0 6vw", gap: "6vw", alignItems: "center", paddingTop: "10vh" }}>
        {/* Left */}
        <div style={{ flex: "0 0 38vw", display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ display: "inline-block", alignSelf: "flex-start", padding: "0.5vh 1.2vw", backgroundColor: "rgba(79,127,255,0.12)", border: "1px solid rgba(79,127,255,0.3)", borderRadius: "2vw", color: "#4F7FFF", fontSize: "0.9vw", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Data Architecture
          </div>
          <h2 style={{ fontSize: "4vw", fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Static demo stores.
            <span style={{ display: "block", color: "rgba(255,255,255,0.45)" }}>API-ready by design.</span>
          </h2>
          <p style={{ fontSize: "1.35vw", fontWeight: 300, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.55, textWrap: "pretty" }}>
            Prisma and PostgreSQL were removed. Static TypeScript modules serve as the data layer — each area gets its own demo module, mutations run in-memory, and the shape is designed to map directly onto a real API.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", marginTop: "1vh", fontSize: "1.1vw", color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
            <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#4F7FFF" }} />
            Drop-in ready to wire to a real API layer
          </div>
        </div>

        {/* Right — code-style data modules */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5vh" }}>
          <div style={{ backgroundColor: "#0D111F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.8vw", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", padding: "1.2vh 1.5vw", borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#131726" }}>
              <div style={{ width: "0.7vw", height: "0.7vw", borderRadius: "50%", backgroundColor: "#FF5F56" }} />
              <div style={{ width: "0.7vw", height: "0.7vw", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
              <div style={{ width: "0.7vw", height: "0.7vw", borderRadius: "50%", backgroundColor: "#27C93F" }} />
              <span style={{ marginLeft: "0.8vw", fontSize: "0.9vw", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>src/lib/data/</span>
            </div>
            <div style={{ padding: "1.8vh 2vw", display: "flex", flexDirection: "column", gap: "1.2vh" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
                <span style={{ fontSize: "1vw", fontFamily: "monospace", color: "#4F7FFF", fontWeight: 600 }}>learner-demo.ts</span>
                <span style={{ fontSize: "0.9vw", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>Enrollments · lesson progress · certificates · quiz</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
                <span style={{ fontSize: "1vw", fontFamily: "monospace", color: "#7C6BF0", fontWeight: 600 }}>admin-demo.ts</span>
                <span style={{ fontSize: "0.9vw", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>Applications · placements · sponsors</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
                <span style={{ fontSize: "1vw", fontFamily: "monospace", color: "#4F7FFF", fontWeight: 600 }}>employer-demo.ts</span>
                <span style={{ fontSize: "0.9vw", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>Talent pool · pipeline · roles · placements</span>
              </div>
              <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.05)", margin: "0.5vh 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
                <span style={{ fontSize: "1vw", fontFamily: "monospace", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>courses.ts</span>
                <span style={{ fontSize: "0.9vw", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>Shared course catalogue + module/lesson structure</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
                <span style={{ fontSize: "1vw", fontFamily: "monospace", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>content.ts</span>
                <span style={{ fontSize: "0.9vw", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>Marketing copy · stats · testimonials</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5vw" }}>
            <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(79,127,255,0.15)", borderRadius: "0.8vw", padding: "1.8vh 1.8vw" }}>
              <div style={{ fontSize: "1.1vw", fontWeight: 700, marginBottom: "0.5vh" }}>In-memory mutations</div>
              <div style={{ fontSize: "1vw", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>Status changes, pipeline moves, and enroll/complete actions update local state + show toasts</div>
            </div>
            <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(124,107,240,0.15)", borderRadius: "0.8vw", padding: "1.8vh 1.8vw" }}>
              <div style={{ fontSize: "1.1vw", fontWeight: 700, marginBottom: "0.5vh" }}>API-shaped types</div>
              <div style={{ fontSize: "1vw", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>All data modules mirror the shapes a real REST or GraphQL API would return — swap-in ready</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "5vh", left: "5vw", fontSize: "0.9vw", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Confidential</div>
    </div>
  );
}
