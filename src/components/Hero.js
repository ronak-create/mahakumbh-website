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

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user: userData } = response.data;

      localStorage.setItem("token", token);
      login(token, userData);
      navigate("/dashboard");
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

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        registerData
      );
      console.log(response.data.message);
      setShowRegister(false);
    } catch (err) {
      console.error(
        "Registration failed",
        err.response?.data?.error || err.message
      );
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen">
      <iframe
        className="absolute inset-0 w-[calc(100%+50px)] h-full left-[-25px] object-fill"
        src="https://www.youtube.com/embed/Mi-qP3I1fHU?autoplay=1&mute=1&loop=1&playlist=Mi-qP3I1fHU"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>

      <div className="absolute inset-0 bg-black/50" />
      <div className="fixed z-10 top-[100px] w-full overflow-hidden bg-orange-500 text-white bg-opacity-70 text-white">
        <div className="whitespace-nowrap animate-scroll">
          <span className="inline-block px-4 font-bold text-lg">
            Early Bird Offer: Flat 10% Discount (On bookings done 30 days in
            advance)
          </span>
          <span className="inline-block px-4 font-bold text-lg">
            Early Bird Offer: Flat 10% Discount (On bookings done 30 days in
            advance)
          </span>
          <span className="inline-block px-4 font-bold text-lg">
            Early Bird Offer: Flat 10% Discount (On bookings done 30 days in
            advance)
          </span>
          <span className="inline-block px-4 font-bold text-lg">
            Early Bird Offer: Flat 10% Discount (On bookings done 30 days in
            advance)
          </span>
          <span className="inline-block px-4 font-bold text-lg">
            Early Bird Offer: Flat 10% Discount (On bookings done 30 days in
            advance)
          </span>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-32 text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-12">
          Experience the Divine
          <span className="block text-orange-500">Mahakumbh Mela 2025</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 max-w-2xl">
          Join millions of devotees in the world's largest spiritual gathering.
          Let us guide your sacred journey.
        </p>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-xl">
          <div className="grid md:grid-cols-2 gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  className="bg-orange-600 text-white px-6 py-2 rounded-full border-2 border-orange-600 hover:bg-orange-700 hover:border-orange-700 transition-all duration-300"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
                <button
                  className="bg-transparent text-orange-600 px-6 py-2 rounded-full border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300"
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
                  className="bg-red-600 text-white px-6 py-2 rounded-full border-2 border-red-600 hover:bg-red-700 hover:border-red-700 transition-all duration-300"
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
            <h2 className="text-lg font-bold mb-4 text-gray-800">Login</h2>
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
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition w-full"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="mt-2 w-full px-6 py-2 rounded border border-orange-600 text-orange-600 hover:bg-orange-50 transition"
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
            <h2 className="text-lg font-bold mb-4 text-gray-800">Register</h2>
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
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition w-full"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className="mt-2 w-full px-6 py-2 rounded border border-orange-600 text-orange-600 hover:bg-orange-50 transition"
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
