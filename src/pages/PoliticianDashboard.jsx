import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../api";

function PoliticianDashboard() {
  const [issues, setIssues] = useState([]);

  const announcements = [
    "New road construction approved in Ward 3",
    "Public meeting scheduled on 15th March",
    "Clean city initiative launched"
  ];

  const loadComplaints = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/politician/complaints`);
      const data = await response.json();

      if (response.ok) {
        setIssues(data);
      } else {
        console.log("Failed to load complaints", data);
      }
    } catch (error) {
      console.error("Error loading politician complaints:", error);
    }
  };

  const markInProgress = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/politician/complaints/${id}/in-progress`, {
        method: "PUT"
      });

      const data = await response.json();

      if (response.ok) {
        alert("Complaint marked as In Progress");
        loadComplaints();
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Server error");
    }
  };

  const markResolved = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/politician/complaints/${id}/resolve`, {
        method: "PUT"
      });

      const data = await response.json();

      if (response.ok) {
        alert("Complaint resolved successfully");
        loadComplaints();
      } else {
        alert(data.message || "Resolve failed");
      }
    } catch (error) {
      console.error("Error resolving complaint:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const total = issues.length;
  const pending = issues.filter((i) => i.status === "PENDING").length;
  const inProgress = issues.filter((i) => i.status === "IN_PROGRESS").length;
  const resolved = issues.filter((i) => i.status === "RESOLVED").length;

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1>Politician Dashboard</h1>
        <p>Monitor constituency issues and public grievances</p>

        <div className="admin-cards">
          <div className="admin-card">
            <h2>{total}</h2>
            <p>Total Complaints</p>
          </div>

          <div className="admin-card">
            <h2>{pending}</h2>
            <p>Pending Issues</p>
          </div>

          <div className="admin-card">
            <h2>{inProgress}</h2>
            <p>In Progress</p>
          </div>

          <div className="admin-card">
            <h2>{resolved}</h2>
            <p>Resolved</p>
          </div>
        </div>

        <h2 style={{ marginTop: "40px" }}>Constituency Issues</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Citizen</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.title}</td>
                <td>{issue.citizenName}</td>
                <td>{issue.location}</td>
                <td>{issue.status}</td>

                <td>
                  <button onClick={() => alert(issue.description)}>View</button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => markInProgress(issue.id)}
                  >
                    In Progress
                  </button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => markResolved(issue.id)}
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: "40px" }}>Public Announcements</h2>
        <ul>
          {announcements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>

        <button>Create Announcement</button>

        <h2 style={{ marginTop: "40px" }}>Government Projects Monitoring</h2>

        <div className="cards">
          <div className="card">
            <p>Road Development Project</p>
            <p>Status: 70% Complete</p>
          </div>

          <div className="card">
            <p>Smart City Initiative</p>
            <p>Status: 45% Complete</p>
          </div>

          <div className="card">
            <p>Public Health Campaign</p>
            <p>Status: Active</p>
          </div>
        </div>

        <h2 style={{ marginTop: "40px" }}>Performance Analytics</h2>

        <div className="cards">
          <div className="card">
            <p>Complaint Resolution Rate</p>
            <p>{total > 0 ? Math.round((resolved / total) * 100) : 0}%</p>
          </div>

          <div className="card">
            <p>Citizen Satisfaction</p>
            <p>4.3 / 5</p>
          </div>

          <div className="card">
            <p>Projects Completed</p>
            <p>18</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PoliticianDashboard;