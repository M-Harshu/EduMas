import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { allCourses, Course } from "./courses";
import { BookOpen, TrendingUp, Award, Clock, Play, Download, Star, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [lastCompletionDates, setLastCompletionDates] = useState<{ [key: string]: string }>({});
  
  const [consultations, setConsultations] = useState<any[]>([]);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [consultFormData, setConsultFormData] = useState({
    topic: "",
    date: "",
    time: "",
    instructor: "",
    query: ""   
  });

  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) setEnrolledCourses(JSON.parse(savedCourses));

    const savedDates = localStorage.getItem("lastCompletionDates");
    if (savedDates) setLastCompletionDates(JSON.parse(savedDates));

    const savedConsults = localStorage.getItem("consultations");
    if (savedConsults) setConsultations(JSON.parse(savedConsults));
  }, []);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem("lastCompletionDates", JSON.stringify(lastCompletionDates));
  }, [lastCompletionDates]);

  useEffect(() => {
    localStorage.setItem("consultations", JSON.stringify(consultations));
  }, [consultations]);

  const addCourse = (course: Course) => {
    if (!enrolledCourses.some((c) => c.id === course.id)) {
      setEnrolledCourses((prev) => [
        ...prev,
        { ...course, progress: 0, completedLessons: 0 },
      ]);
    }
  };

  const updateProgress = (id: number, lessonsCompleted: number) => {
    setEnrolledCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              completedLessons: Math.min(lessonsCompleted, course.totalLessons),
              progress: Math.min(
                100,
                Math.round(
                  (Math.min(lessonsCompleted, course.totalLessons) / course.totalLessons) * 100
                )
              ),
            }
          : course
      )
    );

    const today = new Date().toISOString().split("T")[0];
    setLastCompletionDates((prev) => ({ ...prev, [id]: today }));
  };

  const calculateStreak = () => {
    if (Object.keys(lastCompletionDates).length === 0) return 0;

    const dates = Object.values(lastCompletionDates)
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);

    for (let date of dates) {
      date.setHours(0, 0, 0, 0);
      const diffDays = (current.getTime() - date.getTime()) / (1000 * 3600 * 24);
      if (diffDays === 0 || diffDays === 1) {
        streak++;
        current = new Date(date);
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const stats = [
    {
      icon: BookOpen,
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      label: "Learning Streak",
      value: `${calculateStreak()} days`,
      color: "from-green-500 to-green-600",
    },
    {
      icon: Award,
      label: "Certificates",
      value: enrolledCourses.filter((c) => c.progress === 100).length,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Clock,
      label: "Hours Learned",
      value: enrolledCourses.reduce((acc, c) => acc + c.completedLessons, 0),
      color: "from-purple-500 to-purple-600",
    },
  ];

  const recentAchievements = enrolledCourses
    .filter((course) => course.progress === 100)
    .map((course) => ({
      title: `${course.title} Certificate`,
      date: new Date().toLocaleDateString("en-GB"),
      type: "certificate",
    }));

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { course: "React Fundamentals", task: "Final Project Submission", due: "in 3 days" },
    { course: "UI/UX Design", task: "Design Challenge", due: "in 1 week" },
  ]);

  const handleConsultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConsultFormData({ ...consultFormData, [e.target.name]: e.target.value });
  };

const submitConsultForm = (e: React.FormEvent) => {
  e.preventDefault();
  const newConsultation = { ...consultFormData, dateCreated: new Date().toLocaleString() };
  setConsultations((prev) => [...prev, newConsultation]);

  // push into Upcoming Deadlines
  setUpcomingDeadlines((prev) => [
    ...prev,
    {
      course: "Consultation",
      task: `Consultation on ${consultFormData.topic} with ${consultFormData.instructor}`,
      due: `${consultFormData.date} at ${consultFormData.time}`,
    },
  ]);

  toast.success("Consultation request submitted successfully!");
  setConsultFormData({ topic: "", date: "", time: "", instructor: "", query: "" }); // reset form
  setShowConsultForm(false);
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Student!</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Continue your learning journey</p>
          </div>

          {/* Add Courses */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Add a Course</h3>
            <div className="flex flex-wrap gap-2">
              {allCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => addCourse(course)}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:from-green-600 hover:to-green-700"
                  disabled={enrolledCourses.some((c) => c.id === course.id)}
                >
                  {course.title} {enrolledCourses.some((c) => c.id === course.id) && "✓"}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
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

          {/* Continue Learning & Right Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Continue Learning</h2>
              <div className="space-y-6">
                {enrolledCourses.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No courses yet. Add a course to start learning!</p>
                ) : (
                  enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor}</p>
                            </div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{course.progress}% Complete</span>
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Next: {course.nextLesson}</p>
                            <motion.button
                              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateProgress(course.id, course.completedLessons + 1)}
                            >
                              <Play className="h-4 w-4" />
                              <span>Complete Lesson</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{achievement.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Deadlines */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-red-400 to-red-500 rounded-lg">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{deadline.task}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{deadline.course} • {deadline.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => navigate("/study-material")}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Resources</span>
                  </button>

                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Star className="h-4 w-4" />
                    <span>View Certificates</span>
                  </button>

                  <button
                    onClick={() => navigate("/courses")}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Browse Courses</span>
                  </button>

                  <button
                    onClick={() => navigate("/student-dashboard/workshops")}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>View Workshops</span>
                  </button>

                  <button
                    onClick={() => setShowConsultForm(true)}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Request Consultation</span>
                  </button>
                </div>

                {/* Consultation Form */}
                {showConsultForm && (
                  <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-inner">
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">Request Consultation</h3>
                    <form onSubmit={submitConsultForm} className="space-y-3">
                      <input
                        type="text"
                        name="topic"
                        placeholder="Topic"
                        value={consultFormData.topic}
                        onChange={handleConsultChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                        required
                      />
                      <input
                        type="date"
                        name="date"
                        value={consultFormData.date}
                        onChange={handleConsultChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                        required
                      />
                      <input
                        type="time"
                        name="time"
                        value={consultFormData.time}
                        onChange={handleConsultChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                        required
                      />
                       <textarea
  name="query"
  placeholder="Write your query here..."
  value={consultFormData.query}
  onChange={handleConsultChange}
  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
  rows={3}
  required
/>
                      <input
                        type="text"
                        name="instructor"
                        placeholder="Instructor"
                        value={consultFormData.instructor}
                        onChange={handleConsultChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                        required
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
