function GovLogos() {
  // List of logos with description and optional link
  const logos = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6zfxrFodYTyxTvcdbszOup9VpozeFVwJFzQ&s",
      description: "Ministry of Health & Family Welfare",
      link: "/health",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRJBwZdlaZWoaBVD6Ke0TSVntAgmMJO1vwqQ&s",
      description: "Ministry of Education",
      link: "/education",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnyPlq_2ptecBcDFQ0OvuIN7L1Xzl9_Js0zA&s",
      description: "Ministry of Finance",
      link: "/finance",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR363tIOONKGGDuOWeu3GMTj0wdnRaDoYMUew&s",
      description: "Ministry of Environment",
      link: "/environment",
    },
  ];

  return (
    <div
      className="gov-logos"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        padding: "40px",
        backgroundColor: "#f5f5f5", // background for all logos
      }}
    >
      {logos.map((logo, idx) => (
        <a
          key={idx}
          href={logo.link}
          style={{
            textAlign: "center",
            width: "180px",
            textDecoration: "none",
            color: "#333",
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
          }}
        >
          <img
            src={logo.src}
            alt={logo.description}
            style={{ width: "100%", height: "100px", objectFit: "contain" }}
          />
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            {logo.description}
          </p>
        </a>
      ))}
    </div>
  );
}

export default GovLogos;