import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Auth Components
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

// Dashboard Components
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import MentorDashboard from "./components/Dashboard/MentorDashboard";

// Home Components
import Hero from "./components/Home/Hero";
import FeaturedCourses from "./components/Home/FeaturedCourses";
import Features from "./components/Home/Features";

// Page Components
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Community from "./pages/Community";

// ✅ Home page layout
const Home: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
    <Hero />
    <FeaturedCourses />
    <Features />
  </div>
);

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />

      <main className="flex-1 w-full">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboards */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />

          {/* Pages */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />

          {/* Fallback → Redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-color)",
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
