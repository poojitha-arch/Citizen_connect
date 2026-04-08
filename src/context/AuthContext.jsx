import { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
function AuthProvider({ children }) {

  // Store logged-in user
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login Function
  const login = (role) => {
    const userData = { role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;