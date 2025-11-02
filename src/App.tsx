import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/Layout/ScrollToTop";


// Layout
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Auth
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

// Dashboards
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import MentorDashboard from "./components/Dashboard/MentorDashboard";
import StudentWorkshop from "./components/Dashboard/StudentWorkshop";

// Home
import Hero from "./components/Home/Hero";
import FeaturedCourses from "./components/Home/FeaturedCourses";
import Features from "./components/Home/Features";

// Pages
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Community from "./pages/Community";
import CreateCourse from "./pages/CreateCourse";
import StudyMaterial from "./pages/StudyMaterial";
import PaymentPage from "./pages/PaymentPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

// Info Pages
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import MentorResources from "./pages/MentorResources";
import TeachingGuidelines from "./pages/TeachingGuidelines";
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";


// Home Layout
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
          <Route path="/student-dashboard/workshops" element={<StudentWorkshop />} />

          {/* Pages */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/:courseId/method/:method" element={<PaymentMethodPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />

          {/* Info Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
          <Route path="/mentor-resources" element={<MentorResources />} />
<Route path="/teaching-guidelines" element={<TeachingGuidelines />} />
<Route path="/help" element={<Help />} />
<Route path="/faq" element={<FAQ />} />




          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

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
          <ScrollToTop />
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
