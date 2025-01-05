import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { BookingPage } from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext"; // Custom hook for authentication
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import Footer from './components/Footer'; // Import Footer

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  // Show loading spinner until loading is complete
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Dashboard is protected, only accessible if user is logged in */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route
          path="/events"
          element={user ? <EventsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/booking"
          element={user ? <BookingPage /> : <Navigate to="/" />}
        />

        {/* Public Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer /> {/* Add Footer */}
    </div>
  );
}

export default App;
