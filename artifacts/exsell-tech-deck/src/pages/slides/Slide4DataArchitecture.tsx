export default function Slide4DataArchitecture() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif", color: "#0f172a" }}
    >
      <div style={{ position: "absolute", top: "-5vh", left: "20vw", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10vh", right: "-5vw", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "4vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1vw" }}>E</span>
        </div>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: "1.2vw", letterSpacing: "-0.02em", color: "#0f172a" }}>ExSell <span style={{ color: "#94a3b8", fontWeight: 400 }}>Academy</span></span>
      </div>
      <div style={{ position: "absolute", top: "4.5vh", right: "5vw", fontSize: "1vw", color: "#94a3b8", zIndex: 10 }}>02 / 06</div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "10vh 6vw 6vh" }}>
        <div style={{ display: "inline-flex", padding: "0.6vh 1.2vw", backgroundColor: "#eff6ff", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "2vw", color: "#2563EB", fontSize: "0.9vw", fontWeight: 500, marginBottom: "2.5vh" }}>
          Course Catalogue
        </div>
        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "4vw", fontWeight: 900, margin: "0 0 1.5vh 0", letterSpacing: "-0.04em", textAlign: "center" }}>
          Courses that get you <span style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>hired</span>
        </h2>
        <p style={{ fontSize: "1.4vw", color: "#64748b", margin: "0 0 4.5vh 0", textAlign: "center", maxWidth: "50vw", lineHeight: 1.5 }}>
          Practical, CPD-certified training built with employers. Start free, then specialise.
        </p>

        {/* Course cards */}
        <div style={{ display: "flex", gap: "2.5vw", width: "86vw", justifyContent: "center" }}>
          <div style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.95)", borderRadius: "1.4vw", padding: "3vh 2.5vw", boxShadow: "0 4px 24px rgba(37,99,235,0.09)", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ padding: "0.5vh 1vw", backgroundColor: "#f0fdf4", borderRadius: "1vw", fontSize: "0.85vw", fontWeight: 600, color: "#22C55E" }}>FREE</div>
              <div style={{ fontSize: "0.85vw", color: "#94a3b8" }}>CPD accredited</div>
            </div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.6vw", fontWeight: 800, lineHeight: 1.2, color: "#0f172a" }}>Sales Foundations</div>
            <div style={{ fontSize: "1.1vw", color: "#64748b", lineHeight: 1.5 }}>Core sales skills, objection handling, pipeline basics</div>
            <div style={{ height: "1px", backgroundColor: "#f1f5f9" }} />
            <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
              <div style={{ padding: "0.4vh 0.9vw", backgroundColor: "#eff6ff", borderRadius: "0.5vw", fontSize: "0.85vw", color: "#2563EB", fontWeight: 500 }}>6 modules</div>
              <div style={{ padding: "0.4vh 0.9vw", backgroundColor: "#eff6ff", borderRadius: "0.5vw", fontSize: "0.85vw", color: "#2563EB", fontWeight: 500 }}>Certificate</div>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1.5px solid rgba(37,99,235,0.25)", borderRadius: "1.4vw", padding: "3vh 2.5vw", boxShadow: "0 4px 24px rgba(37,99,235,0.12)", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ padding: "0.5vh 1vw", backgroundColor: "#eff6ff", borderRadius: "1vw", fontSize: "0.85vw", fontWeight: 600, color: "#2563EB" }}>POPULAR</div>
              <div style={{ fontSize: "0.85vw", color: "#94a3b8" }}>CPD accredited</div>
            </div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.6vw", fontWeight: 800, lineHeight: 1.2, color: "#0f172a" }}>Prospecting Essentials</div>
            <div style={{ fontSize: "1.1vw", color: "#64748b", lineHeight: 1.5 }}>Lead generation, outreach sequencing, SDR workflow</div>
            <div style={{ height: "1px", backgroundColor: "#f1f5f9" }} />
            <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
              <div style={{ padding: "0.4vh 0.9vw", backgroundColor: "#eff6ff", borderRadius: "0.5vw", fontSize: "0.85vw", color: "#2563EB", fontWeight: 500 }}>8 modules</div>
              <div style={{ padding: "0.4vh 0.9vw", backgroundColor: "#eff6ff", borderRadius: "0.5vw", fontSize: "0.85vw", color: "#2563EB", fontWeight: 500 }}>Certificate</div>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.95)", borderRadius: "1.4vw", padding: "3vh 2.5vw", boxShadow: "0 4px 24px rgba(124,58,237,0.08)", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ padding: "0.5vh 1vw", backgroundColor: "#f5f3ff", borderRadius: "1vw", fontSize: "0.85vw", fontWeight: 600, color: "#7C3AED" }}>ADVANCED</div>
              <div style={{ fontSize: "0.85vw", color: "#94a3b8" }}>CPD accredited</div>
            </div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.6vw", fontWeight: 800, lineHeight: 1.2, color: "#0f172a" }}>Interview Readiness</div>
            <div style={{ fontSize: "1.1vw", color: "#64748b", lineHeight: 1.5 }}>Mock interviews, competency frameworks, offer negotiation</div>
            <div style={{ height: "1px", backgroundColor: "#f1f5f9" }} />
            <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap" }}>
              <div style={{ padding: "0.4vh 0.9vw", backgroundColor: "#f5f3ff", borderRadius: "0.5vw", fontSize: "0.85vw", color: "#7C3AED", fontWeight: 500 }}>5 modules</div>
              <div style={{ padding: "0.4vh 0.9vw", backgroundColor: "#f5f3ff", borderRadius: "0.5vw", fontSize: "0.85vw", color: "#7C3AED", fontWeight: 500 }}>Certificate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
