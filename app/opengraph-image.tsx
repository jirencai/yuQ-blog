import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";
export const alt = "yuQ Blog social preview image";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(130deg, #020617, #1e3a8a 55%, #0f172a)",
          color: "#f8fafc"
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.9 }}>yuQ Blog</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>Clear Notes, Practical Delivery</div>
          <div style={{ fontSize: 30, opacity: 0.92 }}>Content-first writing and lightweight publishing workflow.</div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
