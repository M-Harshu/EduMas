// src/components/Dashboard/MentorDashboard.tsx
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";

type Stat = {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  color: string;
};

type Course = {
  id: string;
  title: string;
  students: number;
  rating: number;
  revenue: string;
  status: "published" | "draft";
  image: string;
};

type Activity = {
  type: string;
  message: string;
  time: string;
};

type EventItem = {
  title: string;
  date: string;
  time: string;
  type: "workshop" | "consultation" | "session" | "course";
};

const MentorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------- STATES ----------
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [workshopData, setWorkshopData] = useState({ title: "", date: "", time: "" });
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([
    { title: "React Workshop", date: "March 15", time: "2:00 PM", type: "workshop" },
    { title: "1-on-1 Consultation with John", date: "March 16", time: "10:00 AM", type: "consultation" },
    { title: "JavaScript Q&A Session", date: "March 18", time: "4:00 PM", type: "session" },
  ]);

  // ---------- LOAD LOCAL COURSES ----------
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("myCourses") || "[]");
    if (storedCourses.length > 0) setCourses(storedCourses);
  }, []);

  // ---------- HANDLE NEW COURSE FROM CREATE PAGE ----------
  useEffect(() => {
    const state: any = location.state;
    if (state?.newCourse) {
      const newCourse = state.newCourse;

      setCourses((prev) => {
        const updated = [newCourse, ...prev];
        localStorage.setItem("myCourses", JSON.stringify(updated));
        return updated;
      });

      setRecentActivity((prev) => [
        { type: "course", message: `You created a new course: ${newCourse.title}`, time: "Just now" },
        ...prev,
      ]);

      setUpcomingEvents((prev) => [
        { title: newCourse.title, date: "TBD", time: "TBD", type: "course" },
        ...prev,
      ]);

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  // ---------- FIRESTORE REAL-TIME COURSES ----------
  useEffect(() => {
    const q = query(collection(db, "courses"), where("mentorId", "==", "dummyMentor"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
      setCourses(coursesData);
      localStorage.setItem("myCourses", JSON.stringify(coursesData));
    });
    return () => unsubscribe();
  }, []);

  // ---------- HANDLE WORKSHOP ----------
  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshopData.title || !workshopData.date || !workshopData.time) {
      alert("Please fill all fields");
      return;
    }

    const newWorkshop: EventItem = { ...workshopData, type: "workshop" };
    setUpcomingEvents((prev) => [newWorkshop, ...prev]);
    setRecentActivity((prev) => [
      { type: "workshop", message: `You created a new workshop: ${workshopData.title}`, time: "Just now" },
      ...prev,
    ]);
    setWorkshopData({ title: "", date: "", time: "" });
    setShowWorkshopForm(false);
  };

  // ---------- STATS ----------
  const stats: Stat[] = [
    { icon: Users, label: "Total Students", value: "29", color: "from-blue-500 to-blue-600" },
    { icon: BookOpen, label: "Courses Created", value: courses.length.toString(), color: "from-green-500 to-green-600" },
    { icon: TrendingUp, label: "Avg. Rating", value: "4.8", color: "from-yellow-500 to-yellow-600" },
    { icon: DollarSign, label: "Monthly Earnings", value: "$3,240", color: "from-purple-500 to-purple-600" },
  ];

  // ---------- RENDER ----------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Mentor Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => navigate("/create-course")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700"
        >
          Create New Course
        </button>
        <button
          onClick={() => setShowWorkshopForm(true)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium hover:from-green-600 hover:to-teal-700"
        >
          Create Workshop
        </button>
      </div>

      {/* Workshop Form */}
      {showWorkshopForm && (
        <motion.form
          onSubmit={handleWorkshopSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Workshop Title"
            value={workshopData.title}
            onChange={(e) => setWorkshopData({ ...workshopData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          />
          <input
            type="date"
            value={workshopData.date}
            onChange={(e) => setWorkshopData({ ...workshopData, date: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          />
          <input
            type="time"
            value={workshopData.time}
            onChange={(e) => setWorkshopData({ ...workshopData, time: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600"
          >
            Save Workshop
          </button>
        </motion.form>
      )}

      {/* MAIN CONTENT + SIDE PANEL */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Courses */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <motion.div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col">
                <img src={course.image} alt={course.title} className="h-32 w-full object-cover rounded-xl mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">Students: {course.students}</p>
                <p className="text-gray-500 dark:text-gray-400">Rating: {course.rating}</p>
                <p className="text-gray-500 dark:text-gray-400">Revenue: {course.revenue}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{event.date} at {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <ul className="space-y-2">
              {recentActivity.map((activity, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300 text-sm">
                  {activity.message} <span className="text-gray-400">({activity.time})</span>
                </li>
              ))}
              {recentActivity.length === 0 && (
                <li className="text-gray-400 text-sm">No recent activity</li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
