import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(125deg,#080b16,#31172d,#191c3e)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 88, fontWeight: 800 }}>
        YT<span style={{ color: "#fb7185" }}>Convert</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 30,
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        YouTube to MP3 Converter
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 28,
          color: "#cbd5e1",
        }}
      >
        Convert · Preview · Download
      </div>
    </div>,
    size,
  );
}
