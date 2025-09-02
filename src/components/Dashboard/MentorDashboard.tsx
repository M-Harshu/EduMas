// src/components/Dashboard/MentorDashboard.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
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
} from "lucide-react";

type Stat = {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  color: string;
};

type Course = {
  id: number;
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

  const stats: Stat[] = [
    { icon: Users, label: "Total Students", value: "342", color: "from-blue-500 to-blue-600" },
    { icon: BookOpen, label: "Courses Created", value: "12", color: "from-green-500 to-green-600" },
    { icon: TrendingUp, label: "Avg. Rating", value: "4.8", color: "from-yellow-500 to-yellow-600" },
    { icon: DollarSign, label: "Monthly Earnings", value: "$3,240", color: "from-purple-500 to-purple-600" },
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: "React Fundamentals",
      students: 89,
      rating: 4.9,
      revenue: "$1,245",
      status: "published",
      image: "https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg",
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      students: 124,
      rating: 4.7,
      revenue: "$1,890",
      status: "published",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      students: 67,
      rating: 4.8,
      revenue: "$780",
      status: "draft",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    },
  ];

  const recentActivity: Activity[] = [
    { type: "enrollment", message: "New student enrolled in React Fundamentals", time: "2 hours ago" },
    { type: "review", message: "Sarah left a 5-star review on Advanced JavaScript", time: "4 hours ago" },
    { type: "question", message: "Mike asked a question in Node.js course", time: "6 hours ago" },
    { type: "completion", message: "15 students completed React Fundamentals", time: "1 day ago" },
  ];

  const upcomingEvents: EventItem[] = [
    { title: "React Workshop", date: "March 15", time: "2:00 PM", type: "workshop" },
    { title: "1-on-1 Consultation with John", date: "March 16", time: "10:00 AM", type: "consultation" },
    { title: "JavaScript Q&A Session", date: "March 18", time: "4:00 PM", type: "session" },
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

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="ml-4"
>
  <div
    onClick={() => navigate("/create-course")}
    className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
  >
    Go to Create Course
  </div>
</motion.div>



          </div>

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
            {/* Courses Management */}
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
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
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
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
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

              {/* Quick Stats */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">New Enrollments</span>
                    <span className="text-sm font-medium text-green-600">+47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Course Completions</span>
                    <span className="text-sm font-medium text-blue-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</span>
                    <span className="text-sm font-medium text-yellow-600">4.8★</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Revenue Growth</span>
                    <span className="text-sm font-medium text-purple-600">+12%</span>
                  </div>
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
