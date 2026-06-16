export default function Slide3Auth() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#ffffff", fontFamily: "'Inter', sans-serif", color: "#0f172a" }}
    >
      {/* Left panel — deep blue, mirroring the login page */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "44vw", height: "100%", background: "linear-gradient(160deg, #1e3a8a 0%, #2563EB 45%, #4338ca 100%)", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "8vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <div style={{ width: "2.4vw", height: "2.4vw", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "1.1vw" }}>E</span>
          </div>
          <span style={{ color: "#fff", fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: "1.2vw" }}>ExSell Academy</span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 5vw 6vh 5vw" }}>
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: "2.8vw", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 2.5vh 0" }}>
            The career launchpad for future sales professionals.
          </p>
          <p style={{ fontSize: "1.15vw", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: "0 0 3vh 0" }}>
            Learn, certify and get placed — all in one place.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", backgroundColor: "rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#22C55E" }} />
              </div>
              <span style={{ fontSize: "1.05vw", color: "rgba(255,255,255,0.85)" }}>CPD-accredited courses built with hiring employers</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", backgroundColor: "rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#22C55E" }} />
              </div>
              <span style={{ fontSize: "1.05vw", color: "rgba(255,255,255,0.85)" }}>Funded learning pathways for school leavers</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
              <div style={{ width: "1.2vw", height: "1.2vw", borderRadius: "50%", backgroundColor: "rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#22C55E" }} />
              </div>
              <span style={{ fontSize: "1.05vw", color: "rgba(255,255,255,0.85)" }}>Get certified, then matched with real sales roles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — white, login form UI */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "56vw", height: "100%", backgroundColor: "#fff", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8vw" }}>
        <div style={{ position: "absolute", top: "4vh", right: "5vw", display: "flex", alignItems: "center", gap: "0.6vw", color: "#64748b", fontSize: "0.95vw" }}>
          01 / 06
        </div>
        <div style={{ marginBottom: "4vh" }}>
          <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "3.2vw", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 1vh 0" }}>Welcome back</h2>
          <p style={{ fontSize: "1.15vw", color: "#64748b", margin: 0 }}>Log in to continue your training and track your progress.</p>
        </div>
        {/* Form fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh" }}>
          <div>
            <div style={{ fontSize: "1.05vw", fontWeight: 500, marginBottom: "1vh", color: "#334155" }}>Email address</div>
            <div style={{ padding: "1.4vh 1.5vw", border: "1.5px solid #e2e8f0", borderRadius: "0.8vw", fontSize: "1.1vw", color: "#94a3b8", backgroundColor: "#f8fafc" }}>you@example.com</div>
          </div>
          <div>
            <div style={{ fontSize: "1.05vw", fontWeight: 500, marginBottom: "1vh", color: "#334155" }}>Password</div>
            <div style={{ padding: "1.4vh 1.5vw", border: "1.5px solid #e2e8f0", borderRadius: "0.8vw", fontSize: "1.1vw", color: "#94a3b8", backgroundColor: "#f8fafc" }}>Enter your password</div>
          </div>
          <div style={{ padding: "1.6vh 0", background: "#2563EB", borderRadius: "0.8vw", textAlign: "center", color: "#fff", fontSize: "1.15vw", fontWeight: 600, marginTop: "0.5vh" }}>
            Log in
          </div>
          {/* Demo access callout */}
          <div style={{ padding: "1.4vh 1.5vw", backgroundColor: "#eff6ff", border: "1.5px solid rgba(37,99,235,0.2)", borderRadius: "0.8vw" }}>
            <div style={{ fontSize: "1.05vw", fontWeight: 700, color: "#2563EB", marginBottom: "0.3vh" }}>Demo access</div>
            <div style={{ fontSize: "1vw", color: "#475569" }}>Any email · Password: <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>exsell-learner</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
