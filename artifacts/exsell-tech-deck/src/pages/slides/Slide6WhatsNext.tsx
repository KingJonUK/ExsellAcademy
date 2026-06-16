export default function Slide6WhatsNext() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif", color: "#0f172a" }}
    >
      <div style={{ position: "absolute", top: "0vh", left: "25vw", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-5vh", right: "5vw", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10vh", left: "-5vw", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "4vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1vw" }}>E</span>
        </div>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: "1.2vw", letterSpacing: "-0.02em", color: "#0f172a" }}>ExSell <span style={{ color: "#94a3b8", fontWeight: 400 }}>Academy</span></span>
      </div>
      <div style={{ position: "absolute", top: "4.5vh", right: "5vw", fontSize: "1vw", color: "#94a3b8", zIndex: 10 }}>04 / 06</div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", height: "100%", padding: "0 5vw", gap: "4vw", alignItems: "center", paddingTop: "9vh" }}>
        {/* Left */}
        <div style={{ flex: "0 0 38vw", display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "0.6vh 1.2vw", backgroundColor: "#f5f3ff", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "2vw", color: "#7C3AED", fontSize: "0.9vw", fontWeight: 500 }}>
            Employer Portal
          </div>
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "4vw", fontWeight: 900, margin: 0, lineHeight: 1.08, letterSpacing: "-0.04em" }}>
            Hire talent before
            <span style={{ display: "block", background: "linear-gradient(135deg, #7C3AED, #2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>competitors do.</span>
          </h2>
          <p style={{ fontSize: "1.4vw", color: "#475569", margin: 0, lineHeight: 1.55, maxWidth: "34vw" }}>
            A dedicated portal for employers to browse certified candidates, manage open roles, and track placements from a live talent pipeline.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh", marginTop: "1vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#7C3AED", flexShrink: 0 }} />
              <span style={{ fontSize: "1.15vw", color: "#334155", fontWeight: 500 }}>Browse pre-screened, CPD-certified candidates</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#2563EB", flexShrink: 0 }} />
              <span style={{ fontSize: "1.15vw", color: "#334155", fontWeight: 500 }}>Post roles and track pipeline from applied to placed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#22C55E", flexShrink: 0 }} />
              <span style={{ fontSize: "1.15vw", color: "#334155", fontWeight: 500 }}>No recruitment fees — direct access to trained talent</span>
            </div>
          </div>
        </div>

        {/* Right — employer pipeline mockup */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          {/* Pipeline header */}
          <div style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid #e2e8f0", borderRadius: "1.2vw", padding: "2vh 2.5vw", boxShadow: "0 4px 20px rgba(124,58,237,0.07)" }}>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.2vw", fontWeight: 700, marginBottom: "1.8vh", color: "#0f172a" }}>Talent Pipeline</div>
            <div style={{ display: "flex", gap: "1.2vw" }}>
              <div style={{ flex: 1, textAlign: "center", padding: "1.2vh 0", backgroundColor: "#eff6ff", borderRadius: "0.6vw" }}>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "2vw", fontWeight: 800, color: "#2563EB" }}>24</div>
                <div style={{ fontSize: "0.85vw", color: "#64748b", marginTop: "0.2vh" }}>Applied</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "1.2vh 0", backgroundColor: "#fefce8", borderRadius: "0.6vw" }}>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "2vw", fontWeight: 800, color: "#ca8a04" }}>8</div>
                <div style={{ fontSize: "0.85vw", color: "#64748b", marginTop: "0.2vh" }}>Shortlisted</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "1.2vh 0", backgroundColor: "#f0fdf4", borderRadius: "0.6vw" }}>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "2vw", fontWeight: 800, color: "#22C55E" }}>3</div>
                <div style={{ fontSize: "0.85vw", color: "#64748b", marginTop: "0.2vh" }}>Placed</div>
              </div>
            </div>
          </div>

          {/* Candidate cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid #e2e8f0", borderRadius: "1vw", padding: "1.6vh 2vw", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
                <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "linear-gradient(135deg, #dbeafe, #eff6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1.1vw", color: "#2563EB" }}>S</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.1vw" }}>Sofia A.</div>
                  <div style={{ fontSize: "0.9vw", color: "#64748b" }}>Sales Foundations — 100% · Score 84</div>
                </div>
              </div>
              <div style={{ padding: "0.5vh 1.1vw", backgroundColor: "#f0fdf4", borderRadius: "0.5vw", fontSize: "0.9vw", fontWeight: 600, color: "#22C55E" }}>Certified</div>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "1px solid #e2e8f0", borderRadius: "1vw", padding: "1.6vh 2vw", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
                <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1.1vw", color: "#7C3AED" }}>J</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.1vw" }}>Jamie R.</div>
                  <div style={{ fontSize: "0.9vw", color: "#64748b" }}>Prospecting Essentials — 78% · Score 71</div>
                </div>
              </div>
              <div style={{ padding: "0.5vh 1.1vw", backgroundColor: "#eff6ff", borderRadius: "0.5vw", fontSize: "0.9vw", fontWeight: 600, color: "#2563EB" }}>In progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
