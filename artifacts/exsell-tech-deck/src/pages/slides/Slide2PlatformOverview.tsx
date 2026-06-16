export default function Slide2PlatformOverview() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif", color: "#0f172a" }}
    >
      {/* Aurora blobs */}
      <div style={{ position: "absolute", top: "-5vh", right: "5vw", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0vh", left: "-5vw", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "4vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1vw" }}>E</span>
        </div>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: "1.2vw", letterSpacing: "-0.02em", color: "#0f172a" }}>ExSell <span style={{ color: "#94a3b8", fontWeight: 400 }}>Academy</span></span>
      </div>
      <div style={{ position: "absolute", top: "4.5vh", right: "5vw", fontSize: "1vw", color: "#94a3b8", zIndex: 10 }}>01 / 06</div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", height: "100%", padding: "0 5vw", gap: "5vw", alignItems: "center", paddingTop: "9vh" }}>
        {/* Left */}
        <div style={{ flex: "0 0 38vw", display: "flex", flexDirection: "column", gap: "2.5vh" }}>
          <div style={{ display: "inline-flex", alignSelf: "flex-start", padding: "0.6vh 1.2vw", backgroundColor: "#eff6ff", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "2vw", color: "#2563EB", fontSize: "0.9vw", fontWeight: 500 }}>
            The platform
          </div>
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "4.2vw", fontWeight: 900, margin: 0, lineHeight: 1.05, letterSpacing: "-0.04em" }}>
            Three audiences.<br />
            <span style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>One platform.</span>
          </h2>
          <p style={{ fontSize: "1.4vw", fontWeight: 400, color: "#475569", margin: 0, lineHeight: 1.55, maxWidth: "34vw" }}>
            ExSell Academy connects learners, employers, and sponsors in a single CPD-accredited ecosystem built for the UK sales job market.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh", marginTop: "1vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#2563EB", flexShrink: 0 }} />
              <span style={{ fontSize: "1.2vw", color: "#334155", fontWeight: 500 }}>CPD-accredited sales training built with employers</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#7C3AED", flexShrink: 0 }} />
              <span style={{ fontSize: "1.2vw", color: "#334155", fontWeight: 500 }}>Funded learning pathways for school leavers</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#22C55E", flexShrink: 0 }} />
              <span style={{ fontSize: "1.2vw", color: "#334155", fontWeight: 500 }}>Certified talent, matched to live hiring roles</span>
            </div>
          </div>
        </div>

        {/* Right — three audience cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          <div style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "1.2vw", padding: "2.2vh 2.5vw", boxShadow: "0 4px 24px rgba(37,99,235,0.08)", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "0.8vw", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: "1.8vw", height: "1.8vw", borderRadius: "50%", border: "2px solid #2563EB", background: "linear-gradient(135deg, #dbeafe, #eff6ff)" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.4vw", fontWeight: 800, marginBottom: "0.4vh", color: "#0f172a" }}>Learners</div>
              <div style={{ fontSize: "1.1vw", color: "#64748b", fontWeight: 400 }}>School leavers and career changers building sales skills, earning CPD certs, getting placed</div>
            </div>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "1.2vw", padding: "2.2vh 2.5vw", boxShadow: "0 4px 24px rgba(124,58,237,0.08)", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "0.8vw", backgroundColor: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: "1.8vw", height: "1.8vw", borderRadius: "0.4vw", background: "linear-gradient(135deg, #7C3AED, #4f46e5)", opacity: 0.6 }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.4vw", fontWeight: 800, marginBottom: "0.4vh", color: "#0f172a" }}>Employers</div>
              <div style={{ fontSize: "1.1vw", color: "#64748b", fontWeight: 400 }}>Hire sales-ready talent before competitors do — talent pipeline, roles, and placements</div>
            </div>
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "1.2vw", padding: "2.2vh 2.5vw", boxShadow: "0 4px 24px rgba(34,197,94,0.08)", display: "flex", alignItems: "center", gap: "2vw" }}>
            <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "0.8vw", backgroundColor: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: "1.8vw", height: "1.8vw", borderRadius: "50%", background: "#22C55E", opacity: 0.5 }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "1.4vw", fontWeight: 800, marginBottom: "0.4vh", color: "#0f172a" }}>Sponsors</div>
              <div style={{ fontSize: "1.1vw", color: "#64748b", fontWeight: 400 }}>Fund training places, track learner progress, and build a pipeline of grateful talent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
