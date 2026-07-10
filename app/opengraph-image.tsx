import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Isayas Fikadu – Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 50%, #0a0a0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          IF
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: "800",
            margin: "0 0 8px 0",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Isayas Fikadu
        </h1>
        <p style={{ fontSize: 28, color: "#94a3b8", margin: "0 0 24px 0" }}>
          Full Stack Developer & CS Student
        </p>
        <p style={{ fontSize: 18, color: "#64748b", textAlign: "center", maxWidth: 700 }}>
          Building modern websites, web applications, and digital solutions from Ethiopia 🇪🇹
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
          }}
        >
          {["Next.js", "React", "TypeScript", "Node.js", "Tailwind"].map((tech) => (
            <span
              key={tech}
              style={{
                padding: "8px 16px",
                borderRadius: 9999,
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.3)",
                color: "#93c5fd",
                fontSize: 14,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
