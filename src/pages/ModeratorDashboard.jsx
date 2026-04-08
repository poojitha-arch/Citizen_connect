import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../api";

function ModeratorDashboard() {
  const [complaints, setComplaints] = useState([]);

  const loadComplaints = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderator/complaints`);
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

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/moderator/complaints/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Complaint updated to ${status}`);
        loadComplaints();
      } else {
        alert(data.message || "Status update failed");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "PENDING").length;
  const underReview = complaints.filter((c) => c.status === "UNDER_REVIEW").length;
  const rejected = complaints.filter((c) => c.status === "REJECTED").length;

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1>Moderator Dashboard</h1>
        <p>Review and manage citizen complaints</p>

        <div className="admin-cards">
          <div className="admin-card">
            <h2>{total}</h2>
            <p>Total Complaints</p>
          </div>

          <div className="admin-card">
            <h2>{pending}</h2>
            <p>Pending Review</p>
          </div>

          <div className="admin-card">
            <h2>{underReview}</h2>
            <p>Under Review</p>
          </div>

          <div className="admin-card">
            <h2>{rejected}</h2>
            <p>Rejected</p>
          </div>
        </div>

        <h2 style={{ marginTop: "40px" }}>Complaints Waiting for Review</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Complaint</th>
              <th>Citizen</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.citizenName}</td>
                <td>{c.category}</td>
                <td>{c.status}</td>

                <td>
                  <button onClick={() => alert(c.description)}>View</button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => updateStatus(c.id, "UNDER_REVIEW")}
                  >
                    Approve
                  </button>

                  <button
                    style={{ marginLeft: "10px", background: "#dc3545", color: "white" }}
                    onClick={() => updateStatus(c.id, "REJECTED")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: "40px" }}>Moderator Reports</h2>
        <ul>
          <li>Daily Complaint Verification Report</li>
          <li>Rejected Complaints List</li>
          <li>Forwarded Complaints Report</li>
        </ul>
      </div>
    </>
  );
}

export default ModeratorDashboard;