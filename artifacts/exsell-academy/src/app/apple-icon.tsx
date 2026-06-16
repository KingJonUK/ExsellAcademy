import { ImageResponse } from "next/og";

// 180x180 Apple touch icon — same branded mark with safe-area padding.
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: 18,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(140deg, #2563eb 0%, #7c3aed 100%)",
            color: "#ffffff",
            fontSize: 110,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            borderRadius: 38,
          }}
        >
          E
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
