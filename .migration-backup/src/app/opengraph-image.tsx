import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt =
  "ExSell Academy — The career launchpad for future sales professionals.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0B1220",
          color: "#ffffff",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Brand glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: "9999px",
            background: "#2563eb",
            opacity: 0.35,
            filter: "blur(120px)",
          }}
        />
        {/* Violet glow */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "9999px",
            background: "#7c3aed",
            opacity: 0.32,
            filter: "blur(120px)",
          }}
        />

        {/* "E" mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: 32,
            background: "linear-gradient(140deg, #2563eb 0%, #7c3aed 100%)",
            color: "#ffffff",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          E
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            marginTop: 44,
            lineHeight: 1.05,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 500,
            color: "#cbd5e1",
            marginTop: 20,
            maxWidth: 900,
            lineHeight: 1.25,
          }}
        >
          The career launchpad for future sales professionals.
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
