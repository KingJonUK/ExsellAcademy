export default function Slide3Auth() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#0C0F1A", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}
    >
      <div style={{ position: "absolute", top: "5vh", left: "20vw", width: "45vw", height: "45vw", borderRadius: "50%", backgroundColor: "#7C6BF0", opacity: 0.06, filter: "blur(12vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10vh", right: "5vw", width: "40vw", height: "40vw", borderRadius: "50%", backgroundColor: "#4F7FFF", opacity: 0.05, filter: "blur(9vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "4vw 4vw", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "5vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2vw", height: "2vw", backgroundColor: "#4F7FFF", borderRadius: "0.4vw" }} />
        <span style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "-0.02em" }}>ExSell Academy</span>
      </div>
      <div style={{ position: "absolute", top: "5vh", right: "5vw", fontSize: "1vw", color: "rgba(255,255,255,0.4)", zIndex: 10 }}>02 / 06</div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "10vh 6vw 8vh" }}>
        <div style={{ display: "inline-block", padding: "0.5vh 1.2vw", backgroundColor: "rgba(124,107,240,0.12)", border: "1px solid rgba(124,107,240,0.3)", borderRadius: "2vw", color: "#7C6BF0", fontSize: "0.9vw", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3vh" }}>
          Authentication
        </div>
        <h2 style={{ fontSize: "4.5vw", fontWeight: 800, margin: "0 0 1.5vh 0", letterSpacing: "-0.03em", textAlign: "center", lineHeight: 1.1 }}>
          Three-role password gate
        </h2>
        <p style={{ fontSize: "1.4vw", fontWeight: 300, color: "rgba(255,255,255,0.6)", marginBottom: "5vh", textAlign: "center", maxWidth: "50vw", lineHeight: 1.5 }}>
          Built entirely in the browser — no server round-trips, demo-ready from the start.
        </p>

        {/* Three role cards */}
        <div style={{ display: "flex", gap: "2vw", width: "80vw", justifyContent: "center" }}>
          <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(79,127,255,0.25)", borderRadius: "1vw", padding: "3vh 2.5vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#4F7FFF", textTransform: "uppercase", letterSpacing: "0.1em" }}>Learner</div>
            <div style={{ fontSize: "1.5vw", fontWeight: 700, lineHeight: 1.2 }}>Dashboard access</div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />
            <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Courses, lessons, quiz, certificates</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(124,107,240,0.25)", borderRadius: "1vw", padding: "3vh 2.5vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#7C6BF0", textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin</div>
            <div style={{ fontSize: "1.5vw", fontWeight: 700, lineHeight: 1.2 }}>Staff access</div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />
            <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Applications, placements, sponsors</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(79,127,255,0.25)", borderRadius: "1vw", padding: "3vh 2.5vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#4F7FFF", textTransform: "uppercase", letterSpacing: "0.1em" }}>Employer</div>
            <div style={{ fontSize: "1.5vw", fontWeight: 700, lineHeight: 1.2 }}>Partner portal</div>
            <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />
            <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Talent pool, pipeline, roles</div>
          </div>
        </div>

        {/* Detail row */}
        <div style={{ display: "flex", gap: "4vw", marginTop: "4vh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", fontSize: "1.1vw", color: "rgba(255,255,255,0.55)" }}>
            <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#4F7FFF" }} />
            AuthProvider via React Context
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", fontSize: "1.1vw", color: "rgba(255,255,255,0.55)" }}>
            <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#7C6BF0" }} />
            RequireAuth guards with ?next= redirect
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", fontSize: "1.1vw", color: "rgba(255,255,255,0.55)" }}>
            <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#4F7FFF" }} />
            Persisted to localStorage
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "5vh", left: "5vw", fontSize: "0.9vw", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Confidential</div>
    </div>
  );
}
