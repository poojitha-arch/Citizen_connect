import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_BASE_URL from "../api";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        const selectedRole = localStorage.getItem("selectedRole");

        if (selectedRole && selectedRole !== data.role) {
          alert(
            `You selected ${selectedRole}, but this account belongs to ${data.role}`
          );
          return;
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.userId,
            username: data.username,
            email: data.email,
            role: data.role
          })
        );

        alert("Login successful");

        if (data.role === "CITIZEN") {
          navigate("/citizen");
        } else if (data.role === "POLITICIAN") {
          navigate("/politician");
        } else if (data.role === "MODERATOR") {
          navigate("/moderator");
        } else if (data.role === "ADMIN") {
          navigate("/admin");
        } else {
          alert("Unknown role found");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error while logging in");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Sign in to access your dashboard
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <span className="forgot-password">Forgot Password?</span>
          </div>

          <button type="submit">Login</button>

          <p className="signup-link">
            Don&apos;t have an account?{" "}
            <b
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer" }}
            >
              Signup
            </b>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;