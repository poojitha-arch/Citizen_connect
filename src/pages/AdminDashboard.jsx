import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_BASE_URL from "../api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    rejectedComplaints: 0
  });

  const [complaints, setComplaints] = useState([]);

  const loadStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/stats`);
      const data = await response.json();

      if (response.ok) {
        setStats(data);
      } else {
        console.log("Failed to load stats", data);
      }
    } catch (error) {
      console.error("Error loading admin stats:", error);
    }
  };

  const loadComplaints = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/complaints`);
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
      const response = await fetch(`${API_BASE_URL}/api/admin/complaints/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Complaint marked as ${status}`);
        loadStats();
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
    loadStats();
    loadComplaints();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Admin Dashboard</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          <div className="card">
            <h2>{stats.totalComplaints}</h2>
            <p>Total Complaints</p>
          </div>

          <div className="card">
            <h2>{stats.pendingComplaints}</h2>
            <p>Pending</p>
          </div>

          <div className="card">
            <h2>{stats.inProgressComplaints}</h2>
            <p>In Progress</p>
          </div>

          <div className="card">
            <h2>{stats.resolvedComplaints}</h2>
            <p>Resolved</p>
          </div>

          <div className="card">
            <h2>{stats.rejectedComplaints}</h2>
            <p>Rejected</p>
          </div>
        </div>

        <h2 style={{ marginTop: "40px" }}>All Complaints</h2>

        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Citizen</th>
              <th>Category</th>
              <th>Location</th>
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
                <td>{c.location}</td>
                <td>{c.status}</td>
                <td>
                  <button onClick={() => updateStatus(c.id, "RESOLVED")}>
                    Resolve
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => updateStatus(c.id, "REJECTED")}
                  >
                    Reject
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => updateStatus(c.id, "IN_PROGRESS")}
                  >
                    In Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: "40px" }}>Manage Users</h2>
        <button>Add Moderator</button>
        <button style={{ marginLeft: "10px" }}>View Citizens</button>
        <button style={{ marginLeft: "10px" }}>View Politicians</button>

        <h2 style={{ marginTop: "40px" }}>Reports & Analytics</h2>
        <ul>
          <li>Monthly Complaint Report</li>
          <li>Department Performance</li>
          <li>Citizen Feedback</li>
        </ul>
      </div>
    </>
  );
}

export default AdminDashboard;