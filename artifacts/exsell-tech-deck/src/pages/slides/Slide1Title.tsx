export default function Slide1Title() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#ffffff", fontFamily: "'Inter', sans-serif", color: "#0f172a" }}
    >
      {/* Aurora blobs */}
      <div style={{ position: "absolute", top: "-10vh", left: "-8vw", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15vh", right: "-10vw", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30vh", right: "10vw", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Nav bar replica */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "2.2vh 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10, borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <div style={{ width: "2.6vw", height: "2.6vw", borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1.2vw" }}>E</span>
          </div>
          <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: "1.4vw", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#0f172a" }}>ExSell</span>
            <span style={{ color: "#64748b", fontWeight: 400 }}> Academy</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "2.5vw", alignItems: "center" }}>
          <span style={{ fontSize: "1vw", color: "#64748b", fontWeight: 500 }}>Courses</span>
          <span style={{ fontSize: "1vw", color: "#64748b", fontWeight: 500 }}>Funded Training</span>
          <span style={{ fontSize: "1vw", color: "#64748b", fontWeight: 500 }}>Employers</span>
          <span style={{ fontSize: "1vw", color: "#64748b", fontWeight: 500 }}>Sponsors</span>
          <div style={{ padding: "0.8vh 1.8vw", background: "#2563EB", borderRadius: "2vw", color: "#fff", fontSize: "1vw", fontWeight: 600 }}>Apply Now</div>
        </div>
      </div>

      {/* Hero content — two column */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", height: "100%", padding: "0 6vw", gap: "4vw", paddingTop: "8vh" }}>
        {/* Left copy */}
        <div style={{ flex: "0 0 44vw", display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6vw", padding: "0.7vh 1.4vw", backgroundColor: "#eff6ff", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "2vw", color: "#2563EB", fontSize: "0.95vw", fontWeight: 500 }}>
            CPD-accredited academy + talent network
          </div>
          <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "6vw", fontWeight: 900, margin: 0, lineHeight: 1.0, letterSpacing: "-0.04em", textWrap: "balance" }}>
            Build the sales<br />career{" "}
            <span style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>others wish</span>
            <span style={{ display: "block", background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>they had</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.5vw", fontWeight: 400, color: "#475569", margin: 0, lineHeight: 1.55, maxWidth: "36vw" }}>
            Learn. Certify. Get hired.
          </p>
          <div style={{ display: "flex", gap: "1.2vw", marginTop: "1vh" }}>
            <div style={{ padding: "1.2vh 2.2vw", background: "#2563EB", borderRadius: "2vw", color: "#fff", fontSize: "1.1vw", fontWeight: 600 }}>Apply for funded training</div>
            <div style={{ padding: "1.2vh 2.2vw", background: "transparent", border: "1.5px solid #cbd5e1", borderRadius: "2vw", color: "#0f172a", fontSize: "1.1vw", fontWeight: 500 }}>Explore courses</div>
          </div>
        </div>

        {/* Right — talent readiness card */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh", alignItems: "flex-end" }}>
          <div style={{ width: "34vw", backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "1.5vw", padding: "2.5vh 2.5vw", boxShadow: "0 8px 40px rgba(37,99,235,0.12)" }}>
            <div style={{ fontSize: "1vw", color: "#64748b", fontWeight: 500, marginBottom: "0.8vh" }}>Talent readiness</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.8vw", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>Sofia A.</div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4vw", marginTop: "0.5vh" }}>
                  <div style={{ width: "0.7vw", height: "0.7vw", borderRadius: "50%", backgroundColor: "#22C55E" }} />
                  <span style={{ fontSize: "0.9vw", color: "#22C55E", fontWeight: 600 }}>+12 this month</span>
                </div>
              </div>
              <div style={{ width: "5vw", height: "5vw", borderRadius: "50%", border: "3px solid #2563EB", display: "flex", alignItems: "center", justifyContent: "center", background: "#eff6ff" }}>
                <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1.8vw", color: "#2563EB" }}>84</span>
              </div>
            </div>
            <div style={{ marginTop: "2vh", display: "flex", flexDirection: "column", gap: "1.2vh" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5vh" }}>
                  <span style={{ fontSize: "0.9vw", color: "#475569" }}>Sales Foundations</span>
                  <span style={{ fontSize: "0.9vw", fontWeight: 600, color: "#0f172a" }}>100%</span>
                </div>
                <div style={{ height: "0.5vh", backgroundColor: "#e2e8f0", borderRadius: "2px" }}>
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#22C55E", borderRadius: "2px" }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5vh" }}>
                  <span style={{ fontSize: "0.9vw", color: "#475569" }}>Prospecting Essentials</span>
                  <span style={{ fontSize: "0.9vw", fontWeight: 600, color: "#0f172a" }}>64%</span>
                </div>
                <div style={{ height: "0.5vh", backgroundColor: "#e2e8f0", borderRadius: "2px" }}>
                  <div style={{ width: "64%", height: "100%", backgroundColor: "#2563EB", borderRadius: "2px" }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5vh" }}>
                  <span style={{ fontSize: "0.9vw", color: "#475569" }}>Interview Readiness</span>
                  <span style={{ fontSize: "0.9vw", fontWeight: 600, color: "#0f172a" }}>40%</span>
                </div>
                <div style={{ height: "0.5vh", backgroundColor: "#e2e8f0", borderRadius: "2px" }}>
                  <div style={{ width: "40%", height: "100%", backgroundColor: "#7C3AED", borderRadius: "2px" }} />
                </div>
              </div>
            </div>
          </div>
          {/* CPD badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "1vw", backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "1vw", padding: "1.2vh 1.8vw", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", border: "2px solid #2563EB" }} />
            </div>
            <div>
              <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0f172a" }}>CPD Certificate</div>
              <div style={{ fontSize: "0.85vw", color: "#64748b" }}>EXS-2026-000184</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
