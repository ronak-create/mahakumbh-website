import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Hero() {
  const { login, logout, isAuthenticated, user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Remove the useEffect as navigation will be handled in login/logout functions

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user: userData } = response.data;
  
      // Store the token in local storage for future requests
      localStorage.setItem("token", token);
  
      // Call the login function from context which will handle navigation
      login(token, userData);
      navigate("/dashboard"); // Navigate directly after login
  
      // Close the login modal
      setShowLogin(false);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleRegister = async () => {
    if (!registerData.name || !registerData.email || !registerData.password) {
      return alert("All fields are required");
    }
    if (registerData.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    // Proceed with registration
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        registerData
      );
      console.log(response.data.message);
      setShowRegister(false); // Close the register modal after successful registration
    } catch (err) {
      console.error(
        "Registration failed",
        err.response?.data?.error || err.message
      );
    }
  };

  const handleLogout = () => {
    logout(); // Logout from the context
    localStorage.removeItem("authToken"); // Remove the auth token from local storage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&q=80"
      >
        <source src="https://youtu.be/FrUZ2_m9llY" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container mx-auto px-4 py-32 text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Experience the Divine
          <span className="block text-orange-500">Mahakumbh Mela 2025</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 max-w-2xl">
          Join millions of devotees in the world's largest spiritual gathering.
          Let us guide your sacred journey.
        </p>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-4xl">
          <div className="grid md:grid-cols-2 gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
                <button
                  className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>Welcome, {user?.name}!</span>
                </div>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded w-full"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="text-red-600 mt-2 w-full"
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-lg font-bold mb-4">Register</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded w-full"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className="text-red-600 mt-2 w-full"
              onClick={() => setShowRegister(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
