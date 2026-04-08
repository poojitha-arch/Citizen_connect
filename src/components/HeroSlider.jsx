// HeroSlider.jsx
import { useState, useEffect } from "react";

function HeroSlider() {
  const images = [
    "https://picsum.photos/1200/400?1",
    "https://picsum.photos/1200/400?2",
    "https://picsum.photos/1200/400?3",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      {/* Slider Image */}
      <img
        src={images[index]}
        alt="banner"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          transition: "opacity 1s ease-in-out",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 1,
        }}
      ></div>

      {/* Overlay content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          zIndex: 2,
          padding: "20px",
        }}
      >
        {/* National Emblem */}
        <img
          src="https://www.bing.com/th/id/OIP.p-q2wginXpwjHYROGPEHiQHaEv?w=257&h=180&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          alt="National Emblem"
          style={{ width: "120px", marginBottom: "20px" }}
        />

        {/* Title */}
        <h1 style={{ marginBottom: "15px" }}>Citizen Governance Portal</h1>

        {/* Subtitle */}
        <p style={{ maxWidth: "600px", marginBottom: "20px" }}>
          A digital platform connecting citizens with government authorities. Report public issues, track complaints, and participate in governance.
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search government services, schemes..."
          style={{
            width: "60%",
            maxWidth: "600px",
            padding: "12px 20px",
            borderRadius: "25px",
            border: "none",
            fontSize: "16px",
            outline: "none",
          }}
        />

        {/* Trending Searches */}
        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          Trending: <span style={{ margin: "0 10px" }}>Health</span>
          <span style={{ margin: "0 10px" }}>Education</span>
          <span style={{ margin: "0 10px" }}>Environment</span>
        </div>
      </div>
    </div>
  );
}

export default HeroSlider;