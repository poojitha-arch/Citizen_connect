import { useNavigate } from "react-router-dom";

function RoleCard({ title, route }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(route)}>
      <h3>{title}</h3>
      <p>Access {title} Dashboard</p>
    </div>
  );
}

export default RoleCard;