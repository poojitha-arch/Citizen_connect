import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import GovLogos from "../components/GovLogos";
import FloatingButtons from "../components/FloatingButtons";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />

      <HeroSlider />

      <GovLogos />

      <FloatingButtons />

      <section className="hero-section">
        <div className="hero-content">
          <h1>Citizen Governance Portal</h1>

          <p>
            A digital platform connecting citizens with government authorities.
            Report public issues, track complaints, and participate in better
            governance.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/roles")}
            >
              Submit Complaint
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/roles")}
            >
              Explore Dashboards
            </button>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>Citizen Services</h2>

        <div className="service-grid">
          <div className="service-card">
            <h3>Register Complaint</h3>
            <p>
              Report issues related to roads, electricity, sanitation, and water
              supply.
            </p>
          </div>

          <div className="service-card">
            <h3>Track Complaints</h3>
            <p>
              Check complaint status and resolution updates in real time.
            </p>
          </div>

          <div className="service-card">
            <h3>Government Schemes</h3>
            <p>
              Access welfare programs and development initiatives from one place.
            </p>
          </div>

          <div className="service-card">
            <h3>Community Participation</h3>
            <p>
              Engage with officials and contribute ideas for public development.
            </p>
          </div>
        </div>
      </section>

      <section className="stats">
        <h2>Portal Statistics</h2>

        <div className="stats-grid">
          <div className="stat-box">
            <h3>12,540+</h3>
            <p>Complaints Submitted</p>
          </div>

          <div className="stat-box">
            <h3>9,210+</h3>
            <p>Issues Resolved</p>
          </div>

          <div className="stat-box">
            <h3>1,200+</h3>
            <p>Government Officials</p>
          </div>

          <div className="stat-box">
            <h3>320+</h3>
            <p>Development Projects</p>
          </div>
        </div>
      </section>

      <section className="achievements">
        <h2>Government Achievements</h2>

        <div className="achievement-cards">
          <div className="achievement-card">
            <img src="https://picsum.photos/400/250?1" alt="achievement" />
            <p>Smart Cities Development</p>
          </div>

          <div className="achievement-card">
            <img src="https://picsum.photos/400/250?2" alt="achievement" />
            <p>Digital Governance</p>
          </div>

          <div className="achievement-card">
            <img src="https://picsum.photos/400/250?3" alt="achievement" />
            <p>Infrastructure Expansion</p>
          </div>

          <div className="achievement-card">
            <img src="https://picsum.photos/400/250?4" alt="achievement" />
            <p>Clean Environment Initiatives</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Facing a Problem in Your Area?</h2>

        <p>
          Submit your complaint and track the resolution process online.
          Together, we can improve our communities.
        </p>

        <button className="btn-primary" onClick={() => navigate("/roles")}>
          Raise Complaint
        </button>
      </section>

      <section className="contacts">
        <h2>Important Contacts</h2>

        <div className="contact-grid">
          <div className="contact-card">
            <h4>Municipal Office</h4>
            <p>1800-100-111</p>
          </div>

          <div className="contact-card">
            <h4>Public Works Department</h4>
            <p>1800-100-222</p>
          </div>

          <div className="contact-card">
            <h4>Water Supply Board</h4>
            <p>1800-100-333</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Citizen Governance Portal | Government of India</p>
      </footer>
    </div>
  );
}

export default Home;