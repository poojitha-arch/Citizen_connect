import { useNavigate } from "react-router-dom";

function RoleSelect() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="role-page">
      <div className="role-container">
        <h1 className="role-title">Public Grievance Portal</h1>

        <p className="role-subtitle">Select your role to continue</p>

        <div className="role-grid">
          <div className="role-card" onClick={() => handleRoleSelect("CITIZEN")}>
            <h3>Citizen</h3>
            <p>Submit complaints and track issue resolution.</p>
            <button>Enter</button>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect("POLITICIAN")}>
            <h3>Politician</h3>
            <p>Monitor constituency problems and governance.</p>
            <button>Enter</button>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect("MODERATOR")}>
            <h3>Moderator</h3>
            <p>Review and verify complaints from citizens.</p>
            <button>Enter</button>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect("ADMIN")}>
            <h3>Admin</h3>
            <p>Manage the system and oversee platform activity.</p>
            <button>Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;