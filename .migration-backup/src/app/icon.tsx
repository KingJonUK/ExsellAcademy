import { ImageResponse } from "next/og";

// Branded "E" mark on a brand → violet gradient (matches the Logo).
export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #2563eb 0%, #7c3aed 100%)",
          color: "#ffffff",
          fontSize: 340,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          borderRadius: 110,
        }}
      >
        E
      </div>
    ),
    {
      ...size,
    },
  );
}
