import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../api";

function CitizenDashboard() {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const loadMyComplaints = async () => {
    try {
      if (!loggedInUser || !loggedInUser.id) {
        console.log("User ID not found in localStorage");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/complaints/user/${loggedInUser.id}`
      );

      const data = await response.json();

      if (response.ok) {
        setComplaints(data);
      } else {
        console.log("Failed to load complaints", data);
      }
    } catch (error) {
      console.error("Error loading complaints:", error);
    }
  };

  useEffect(() => {
    loadMyComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUser || !loggedInUser.id) {
      alert("User not logged in properly. Please login again.");
      return;
    }

    const complaintData = {
      title: title,
      description: description,
      category: problem,
      location: location,
      userId: loggedInUser.id
    };

    console.log("Submitting complaint:", complaintData);

    try {
      const response = await fetch(`${API_BASE_URL}/api/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(complaintData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Complaint Submitted Successfully!");

        setTitle("");
        setProblem("");
        setLocation("");
        setDescription("");

        loadMyComplaints();
      } else {
        alert(data.message || "Complaint submission failed");
        console.log("Complaint error:", data);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Server error while submitting complaint");
    }
  };

  return (
    <div className="citizen-page">
      <Navbar />

      <header className="dashboard-header">
        <h1>Citizen Dashboard</h1>
        <p>Raise your issues directly to government authorities</p>
      </header>

      <section className="complaint-section">
        <h2>Submit Your Complaint</h2>

        <form className="complaint-form" onSubmit={handleSubmit}>
          <label>Complaint Title</label>
          <input
            type="text"
            placeholder="Enter complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Select Problem Type</label>
          <select
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          >
            <option value="">Select Issue</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity Problem">Electricity Problem</option>
            <option value="Garbage Issue">Garbage Issue</option>
            <option value="Public Transport">Public Transport</option>
          </select>

          <label>Location</label>
          <input
            type="text"
            placeholder="Enter complaint location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Describe Your Problem</label>
          <textarea
            placeholder="Explain your problem clearly..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit Complaint</button>
        </form>
      </section>

      <section className="complaint-section">
        <h2>My Complaints</h2>

        {complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          complaints.map((complaint) => (
            <div
              key={complaint.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px"
              }}
            >
              <h3>{complaint.title}</h3>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Created At:</strong> {complaint.createdAt}</p>
            </div>
          ))
        )}
      </section>

      <section className="contacts">
        <h2>Contact Authorities</h2>

        <div className="contact-cards">
          <div className="contact-card">
            <h3>Municipal Office</h3>
            <p>📞 1800-123-456</p>
            <p>📧 municipal@gov.in</p>
          </div>

          <div className="contact-card">
            <h3>Water Department</h3>
            <p>📞 1800-222-333</p>
            <p>📧 water@gov.in</p>
          </div>

          <div className="contact-card">
            <h3>Electricity Board</h3>
            <p>📞 1800-555-666</p>
            <p>📧 electricity@gov.in</p>
          </div>
        </div>
      </section>

      <section className="links">
        <h2>Useful Government Links</h2>

        <ul>
          <li><a href="#">RTI Portal</a></li>
          <li><a href="#">Public Grievance Portal</a></li>
          <li><a href="#">Government Schemes</a></li>
          <li><a href="#">Tender Documents</a></li>
          <li><a href="#">Media Publications</a></li>
        </ul>
      </section>

      <footer className="footer">
        <p>© 2026 Citizen Interaction Portal | Government of India</p>
      </footer>
    </div>
  );
}

export default CitizenDashboard;