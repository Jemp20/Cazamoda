export default function VideoSection() {
  return (
    <section style={{ background: "#0f0f0f", padding: "2rem", display: "flex", justifyContent: "center" }}>
      <video
        src="http://localhost:5173/videos/Video.mp4.mp4"
        style={{ width: "100%", maxWidth: "800px", borderRadius: "12px" }}
        controls
        playsInline
        loop
      />
    </section>
  );
}