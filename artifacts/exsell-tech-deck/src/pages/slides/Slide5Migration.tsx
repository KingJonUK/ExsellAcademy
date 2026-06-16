export default function Slide5Migration() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#ffffff", fontFamily: "'Inter', sans-serif", color: "#0f172a" }}
    >
      <div style={{ position: "absolute", top: "5vh", right: "5vw", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10vh", left: "0vw", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "4vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1vw" }}>E</span>
        </div>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: "1.2vw", letterSpacing: "-0.02em", color: "#0f172a" }}>ExSell <span style={{ color: "#94a3b8", fontWeight: 400 }}>Academy</span></span>
      </div>
      <div style={{ position: "absolute", top: "4.5vh", right: "5vw", fontSize: "1vw", color: "#94a3b8", zIndex: 10 }}>03 / 06</div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", height: "100%", padding: "0 5vw", gap: "5vw", alignItems: "center", paddingTop: "9vh" }}>
        {/* Left */}
        <div style={{ flex: "0 0 38vw", display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "0.6vh 1.2vw", backgroundColor: "#eff6ff", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "2vw", color: "#2563EB", fontSize: "0.9vw", fontWeight: 500 }}>
            Learner Dashboard
          </div>
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "4vw", fontWeight: 900, margin: 0, lineHeight: 1.08, letterSpacing: "-0.04em" }}>
            Your progress,
            <span style={{ display: "block", background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>visualised.</span>
          </h2>
          <p style={{ fontSize: "1.4vw", color: "#475569", margin: 0, lineHeight: 1.55, maxWidth: "34vw" }}>
            Every learner gets a personal dashboard tracking their certification journey, talent readiness score, and upcoming placement opportunities.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh", marginTop: "1vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#2563EB", flexShrink: 0 }} />
              <span style={{ fontSize: "1.15vw", color: "#334155", fontWeight: 500 }}>Real-time talent readiness score (0–100)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#7C3AED", flexShrink: 0 }} />
              <span style={{ fontSize: "1.15vw", color: "#334155", fontWeight: 500 }}>Course player with lessons, quizzes, and module certificates</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#22C55E", flexShrink: 0 }} />
              <span style={{ fontSize: "1.15vw", color: "#334155", fontWeight: 500 }}>Downloadable CPD certificates with verification IDs</span>
            </div>
          </div>
        </div>

        {/* Right — dashboard mockup */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          {/* Top stat row */}
          <div style={{ display: "flex", gap: "1.5vw" }}>
            <div style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid #e2e8f0", borderRadius: "1vw", padding: "2vh 2vw", boxShadow: "0 2px 16px rgba(37,99,235,0.06)" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748b", marginBottom: "0.5vh" }}>Talent Readiness</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5vw" }}>
                <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "3vw", fontWeight: 900, color: "#2563EB" }}>84</span>
                <span style={{ fontSize: "1vw", color: "#22C55E", fontWeight: 600 }}>+12</span>
              </div>
            </div>
            <div style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid #e2e8f0", borderRadius: "1vw", padding: "2vh 2vw", boxShadow: "0 2px 16px rgba(37,99,235,0.06)" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748b", marginBottom: "0.5vh" }}>Courses enrolled</div>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "3vw", fontWeight: 900, color: "#0f172a" }}>3</div>
            </div>
            <div style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid #e2e8f0", borderRadius: "1vw", padding: "2vh 2vw", boxShadow: "0 2px 16px rgba(37,99,235,0.06)" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748b", marginBottom: "0.5vh" }}>Certificates</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5vw" }}>
                <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "3vw", fontWeight: 900, color: "#22C55E" }}>1</span>
                <span style={{ fontSize: "0.9vw", color: "#64748b" }}>earned</span>
              </div>
            </div>
          </div>

          {/* Progress bars */}
          <div style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid #e2e8f0", borderRadius: "1.2vw", padding: "2.2vh 2.5vw", boxShadow: "0 4px 20px rgba(37,99,235,0.07)" }}>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.2vw", fontWeight: 700, marginBottom: "2vh", color: "#0f172a" }}>Certification Journey</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6vh" }}>
                  <span style={{ fontSize: "1vw", color: "#334155", fontWeight: 500 }}>Sales Foundations</span>
                  <span style={{ fontSize: "1vw", fontWeight: 700, color: "#22C55E" }}>100% — Certified</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#e2e8f0", borderRadius: "4px" }}>
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#22C55E", borderRadius: "4px" }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6vh" }}>
                  <span style={{ fontSize: "1vw", color: "#334155", fontWeight: 500 }}>Prospecting Essentials</span>
                  <span style={{ fontSize: "1vw", fontWeight: 700, color: "#2563EB" }}>64%</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#e2e8f0", borderRadius: "4px" }}>
                  <div style={{ width: "64%", height: "100%", backgroundColor: "#2563EB", borderRadius: "4px" }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6vh" }}>
                  <span style={{ fontSize: "1vw", color: "#334155", fontWeight: 500 }}>Interview Readiness</span>
                  <span style={{ fontSize: "1vw", fontWeight: 700, color: "#7C3AED" }}>40%</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#e2e8f0", borderRadius: "4px" }}>
                  <div style={{ width: "40%", height: "100%", backgroundColor: "#7C3AED", borderRadius: "4px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
