// src/components/Dashboard/MentorDashboard.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Calendar,
  MessageSquare,
  Star,
  PlusCircle,
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
  type: string;
};

const MentorDashboard: React.FC = () => {
  const navigate = useNavigate();

  // ----------- STATES -----------
  const [consultations] = useState<any[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [workshopData, setWorkshopData] = useState({
    title: "",
    date: "",
    time: "",
  });

  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([
    { title: "React Workshop", date: "March 15", time: "2:00 PM", type: "workshop" },
    { title: "1-on-1 Consultation with John", date: "March 16", time: "10:00 AM", type: "consultation" },
    { title: "JavaScript Q&A Session", date: "March 18", time: "4:00 PM", type: "session" },
  ]);

  // ----------- HANDLE NEW WORKSHOP -----------
  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workshopData.title || !workshopData.date || !workshopData.time) {
      alert("Please fill all fields");
      return;
    }

    const newWorkshop: EventItem = {
      title: workshopData.title,
      date: workshopData.date,
      time: workshopData.time,
      type: "workshop",
    };

    setUpcomingEvents((prev) => [newWorkshop, ...prev]);

    const newActivity: Activity = {
      type: "workshop_added",
      message: `You created a new workshop: ${workshopData.title}`,
      time: "Just now",
    };
    setRecentActivity((prev) => [newActivity, ...prev]);

    setWorkshopData({ title: "", date: "", time: "" });
    setShowWorkshopForm(false);
  };

  // ----------- STATS -----------
  const stats: Stat[] = [
    { icon: Users, label: "Total Students", value: "29", color: "from-blue-500 to-blue-600" },
    { icon: BookOpen, label: "Courses Created", value: courses.length.toString(), color: "from-green-500 to-green-600" },
    { icon: TrendingUp, label: "Avg. Rating", value: "4.8", color: "from-yellow-500 to-yellow-600" },
    { icon: DollarSign, label: "Monthly Earnings", value: "$3,240", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mentor Dashboard</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your courses and students</p>
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/create-course")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
              >
                Go to Create Course
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWorkshopForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Workshop</span>
              </motion.button>
            </div>
          </div>

          {/* Workshop Form Modal */}
          {showWorkshopForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Create New Workshop</h2>
                <form onSubmit={handleWorkshopSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Workshop Title"
                    value={workshopData.title}
                    onChange={(e) => setWorkshopData({ ...workshopData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <input
                    type="date"
                    value={workshopData.date}
                    onChange={(e) => setWorkshopData({ ...workshopData, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <input
                    type="time"
                    value={workshopData.time}
                    onChange={(e) => setWorkshopData({ ...workshopData, time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowWorkshopForm(false)}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Workshop
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Courses Section */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Courses</h2>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <img src={course.image} alt={course.title} className="w-full md:w-32 h-32 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">{course.students} students</span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{course.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                course.status === "published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                              }`}
                            >
                              {course.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <p className="text-lg font-semibold text-green-600 dark:text-green-400">{course.revenue}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={`View ${course.title}`}
                            >
                              <Eye className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors rounded"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={`Edit ${course.title}`}
                            >
                              <Edit className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
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
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-to-r from-green-400 to-green-500 rounded-lg">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorDashboard;
