import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    role: "CITIZEN",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ FIXED: Send only email
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agree) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email   // 🔥 main fix
        })
      });

      const data = await response.text();

      if (response.ok) {
        alert(data);
        setOtpSent(true);
      } else {
        alert(data || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      alert("Server error while sending OTP");
    }
  };

  // ✅ OTP verify same but registration happens in backend
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          otp: otp,
          ...user   // 🔥 IMPORTANT: send full user data for registration
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful");
        console.log("Verify OTP response:", data);
        navigate("/login");
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verify error:", error);
      alert("Server error while verifying OTP");
    }
  };

  const getPasswordStrength = () => {
    if (user.password.length < 6) return "Weak";
    if (user.password.length < 10) return "Medium";
    return "Strong";
  };

  return (
    <div className="signup-page">
      <Navbar />

      <div className="signup-container">
        <h2>Create Your Account</h2>

        <form onSubmit={handleSendOtp} className="signup-form">

          <input type="text" name="username" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Mobile" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} />

          <div className="two-fields">
            <input type="text" name="city" placeholder="City" onChange={handleChange} />
            <input type="text" name="state" placeholder="State" onChange={handleChange} />
          </div>

          <select name="role" value={user.role} onChange={handleChange}>
            <option value="CITIZEN">Citizen</option>
            <option value="POLITICIAN">Politician</option>
            <option value="MODERATOR">Moderator</option>
            <option value="ADMIN">Admin</option>
          </select>

          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required />
          <small>Password Strength: {getPasswordStrength()}</small>

          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

          <div>
            <input type="checkbox" onChange={(e) => setAgree(e.target.checked)} />
            <label> Accept Terms</label>
          </div>

          {!otpSent ? (
            <button type="submit">Send OTP</button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="button" onClick={handleVerifyOtp}>
                Verify OTP & Register
              </button>
            </>
          )}

        </form>
      </div>
    </div>
  );
}

export default Signup;