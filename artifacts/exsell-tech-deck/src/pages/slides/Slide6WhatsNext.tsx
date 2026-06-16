export default function Slide6WhatsNext() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#0C0F1A", fontFamily: "'Inter', sans-serif", color: "#FFFFFF" }}
    >
      {/* Central orb */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "65vw", height: "65vw", borderRadius: "50%", backgroundColor: "#4F7FFF", opacity: 0.05, filter: "blur(16vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20vh", right: "-8vw", width: "45vw", height: "45vw", borderRadius: "50%", backgroundColor: "#7C6BF0", opacity: 0.08, filter: "blur(9vw)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "4vw 4vw", pointerEvents: "none" }} />

      {/* Wordmark */}
      <div style={{ position: "absolute", top: "5vh", left: "5vw", display: "flex", alignItems: "center", gap: "0.8vw", zIndex: 10 }}>
        <div style={{ width: "2vw", height: "2vw", backgroundColor: "#4F7FFF", borderRadius: "0.4vw" }} />
        <span style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "-0.02em" }}>ExSell Academy</span>
      </div>
      <div style={{ position: "absolute", top: "5vh", right: "5vw", fontSize: "1vw", color: "rgba(255,255,255,0.4)", zIndex: 10 }}>05 / 06</div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "10vh 6vw 8vh" }}>
        <div style={{ display: "inline-block", padding: "0.5vh 1.2vw", backgroundColor: "rgba(79,127,255,0.12)", border: "1px solid rgba(79,127,255,0.3)", borderRadius: "2vw", color: "#4F7FFF", fontSize: "0.9vw", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "3vh" }}>
          What's Next
        </div>
        <h2 style={{ fontSize: "4.8vw", fontWeight: 800, margin: "0 0 1.5vh 0", letterSpacing: "-0.03em", textAlign: "center", lineHeight: 1.05 }}>
          The foundation is in place.
        </h2>
        <p style={{ fontSize: "1.5vw", fontWeight: 300, color: "rgba(255,255,255,0.55)", margin: "0 0 5vh 0", textAlign: "center" }}>
          The platform is ready to deploy on Replit today.
        </p>

        {/* Three next steps */}
        <div style={{ display: "flex", gap: "2.5vw", justifyContent: "center", width: "78vw" }}>
          <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(79,127,255,0.2)", borderRadius: "1vw", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 800, color: "#4F7FFF" }}>01</div>
            <div style={{ width: "3vw", height: "2px", backgroundColor: "#4F7FFF", opacity: 0.5 }} />
            <div style={{ fontSize: "1.4vw", fontWeight: 700, lineHeight: 1.2 }}>Mobile companion app</div>
            <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>Expo / React Native — reuses existing data modules and brand system</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(124,107,240,0.2)", borderRadius: "1vw", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 800, color: "#7C6BF0" }}>02</div>
            <div style={{ width: "3vw", height: "2px", backgroundColor: "#7C6BF0", opacity: 0.5 }} />
            <div style={{ fontSize: "1.4vw", fontWeight: 700, lineHeight: 1.2 }}>Promo video</div>
            <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>Animated launch video for the academy — built from the brand system in code</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "#131726", border: "1px solid rgba(79,127,255,0.2)", borderRadius: "1vw", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 800, color: "#4F7FFF" }}>03</div>
            <div style={{ width: "3vw", height: "2px", backgroundColor: "#4F7FFF", opacity: 0.5 }} />
            <div style={{ fontSize: "1.4vw", fontWeight: 700, lineHeight: 1.2 }}>Investor pitch deck</div>
            <div style={{ fontSize: "1.1vw", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>CPD academy + employer talent network — a compelling funding story</div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "5vh", left: "5vw", fontSize: "0.9vw", fontWeight: 300, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Confidential</div>
    </div>
  );
}
