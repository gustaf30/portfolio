import { ImageResponse } from "next/og";

export const alt = "Gustavo Ferraz — Desenvolvedor Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0f",
        color: "#e0e0e0",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "#4361ee",
            letterSpacing: "0.1em",
          }}
        >
          {"<full-stack developer />"}
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Gustavo
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#4361ee",
            lineHeight: 1.1,
          }}
        >
          Ferraz
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#8888aa",
            marginTop: "8px",
          }}
        >
          TypeScript · React · Node.js
        </div>
      </div>
    </div>,
    { ...size }
  );
}
