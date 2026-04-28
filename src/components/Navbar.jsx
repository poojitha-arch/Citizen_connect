import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const hideAuthButtons =
    location.pathname === "/citizen" ||
    location.pathname === "/moderator" ||
    location.pathname === "/admin" ||
    location.pathname === "/politician";

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        IN Citizen Portal
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/schemes">Schemes</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {!hideAuthButtons && (
          <>
            <li>
              <Link className="login-btn" to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link className="signup-btn" to="/signup">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;