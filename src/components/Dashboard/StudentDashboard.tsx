import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { allCourses, Course } from "./courses"; // keep imported Course
import { useAuth } from "../../contexts/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Play,
  Download,
  Star,
  Calendar,
} from "lucide-react";
import { toast } from "react-hot-toast";

const embedUrl = (url: string) =>
  `https://www.youtube.com/embed/${extractYouTubeId(url)}`;

function extractYouTubeId(url: string) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

type Deadline = {
  course: string;
  task: string;
  due: string;
};

type DashboardCourse = {
  id: number;
  title: string;
  progress: number;
  instructor?: string;
  totalLessons?: number;
  completedLessons?: number;
  nextLesson?: string;
  playlist: { title: string; url: string; completed: boolean }[];
};

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<DashboardCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<DashboardCourse | null>(
    null
  );
  const [lastCompletionDates, setLastCompletionDates] = useState<{
    [key: string]: string;
  }>({});
  const [consultations, setConsultations] = useState<any[]>([]);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [consultFormData, setConsultFormData] = useState({
    studentName: "Anonymous",
    topic: "",
    date: "",
    time: "",
    instructor: "",
    query: "",
  });
  const [premiumCourse, setPremiumCourse] = useState<Course | null>(null);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { course: "React Fundamentals", task: "Final Project Submission", due: "in 3 days" },
    { course: "UI/UX Design", task: "Design Challenge", due: "in 1 week" },
  ]);

  // Load saved data from localStorage
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
    localStorage.setItem(
      "lastCompletionDates",
      JSON.stringify(lastCompletionDates)
    );
  }, [lastCompletionDates]);

  useEffect(() => {
    const handleConsultUpdate = () => {
      const saved = localStorage.getItem("consultations");
      if (saved) setConsultations(JSON.parse(saved));
    };
    window.addEventListener("consultationUpdated", handleConsultUpdate);
    return () =>
      window.removeEventListener("consultationUpdated", handleConsultUpdate);
  }, []);

  useEffect(() => {
    localStorage.setItem("consultations", JSON.stringify(consultations));
  }, [consultations]);

  const addCourse = (course: Course) => {
    if (course.isPremium) {
      setPremiumCourse(course);
      return;
    }

    if (!enrolledCourses.some((c) => c.id === course.id)) {
      setEnrolledCourses((prev) => [
        ...prev,
        {
          ...course,
          progress: 0,
          completedLessons: 0,
          totalLessons: course.playlist?.length || 0,
          nextLesson: course.playlist?.[0]?.title || "First lesson",
          playlist:
            course.playlist?.map((v) => ({
              ...v,
              url: embedUrl(v.url),
              completed: false,
            })) || [],
        },
      ]);
    }
  };

  // ⬆️ put this near the other hooks
const location = useLocation();

useEffect(() => {
  const paidCourse = location.state?.paidCourse;

  if (paidCourse) {
    if (!enrolledCourses.some((c) => c.id === paidCourse.id)) {
      setEnrolledCourses((prev) => [
        ...prev,
        {
          ...paidCourse,
          progress: 0,
          completedLessons: 0,
          totalLessons: paidCourse.playlist?.length || 0,
          nextLesson: paidCourse.playlist?.[0]?.title || "First lesson",
          playlist:
            paidCourse.playlist?.map((v: { title: string; url: string }) => ({
              ...v,
              url: embedUrl(v.url),
              completed: false,
            })) || [],
        },
      ]);
    }

    // ✅ Clear the state so it doesn’t add again
    window.history.replaceState({}, document.title);
  }
}, [enrolledCourses, location]);


  const updateProgress = (id: number) => {
    setEnrolledCourses((prev) =>
      prev.map((course) => {
        if (course.id === id) {
          const updatedPlaylist = course.playlist.map((video, index) =>
            index === course.completedLessons
              ? { ...video, completed: true }
              : video
          );
          const newCompleted = Math.min(
            (course.completedLessons || 0) + 1,
            course.totalLessons || 0
          );
          return {
            ...course,
            playlist: updatedPlaylist,
            completedLessons: newCompleted,
            progress:
              course.totalLessons && course.totalLessons > 0
                ? Math.round((newCompleted / course.totalLessons) * 100)
                : 0,
            nextLesson:
              updatedPlaylist.find((v) => !v.completed)?.title ||
              "All lessons completed",
          };
        }
        return course;
      })
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
      const diffDays =
        (current.getTime() - date.getTime()) / (1000 * 3600 * 24);
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
      value: enrolledCourses.reduce(
        (acc, c) => acc + (c.completedLessons || 0),
        0
      ),
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

const downloadCertificate = async () => {
  try {
    const filePath =
      "C:/Users/jyoth/Downloads/project-bolt-sb1-hpq5vsbq/project/public/certificate.pdf";
    const response = await fetch(filePath);

    if (!response.ok) throw new Error("Failed to fetch certificate");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error(error);
  }
};


const handleViewCertificates = () => {
  const filePath = "/certificate.pdf"; // File must be inside `public/` folder in your project
  window.open(filePath, "_blank");
};



  const handleConsultChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConsultFormData({ ...consultFormData, [e.target.name]: e.target.value });
  };

  const submitConsultForm = (e: React.FormEvent) => {
    e.preventDefault();

    const newConsultation = {
      ...consultFormData,
      studentName: consultFormData.studentName || "Anonymous",
      dateCreated: new Date().toISOString(),
    };

    setConsultations((prev) => {
      const updated = [...prev, newConsultation];
      localStorage.setItem("consultations", JSON.stringify(updated));
      const event = new Event("consultationUpdated");
      window.dispatchEvent(event);
      return updated;
    });

    setUpcomingDeadlines((prev) => [
      ...prev,
      {
        course: consultFormData.topic || "Consultation",
        task: "Consultation Request",
        due: consultFormData.date,
      },
    ]);

    setConsultFormData({
      studentName: "Anonymous",
      topic: "",
      date: "",
      time: "",
      instructor: "",
      query: "",
    });
    setShowConsultForm(false);

    toast.success("Consultation request submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, Student!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Continue your learning journey
            </p>
          </div>

          {/* Add Courses */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Add a Course
            </h3>
            <div className="flex flex-wrap gap-2">
              {allCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => addCourse(course)}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:from-green-600 hover:to-green-700"
                  disabled={enrolledCourses.some((c) => c.id === course.id)}
                >
                  {course.title}{" "}
                  {enrolledCourses.some((c) => c.id === course.id) && "✓"}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Course Modal */}
          {premiumCourse && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {premiumCourse.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  This is a premium course. Price:{" "}
                  <span className="font-semibold">
                    ${premiumCourse.price || 499}
                  </span>
                </p>
                <div className="flex justify-center gap-4">
  <button
    onClick={() => {
      navigate("/payment", { state: { course: premiumCourse } });
      setPremiumCourse(null);
    }}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    Proceed to Pay
  </button>
  
  <button
    onClick={() => setPremiumCourse(null)}
    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
  >
    Cancel
  </button>
</div>
              </div>
            </div>
          )}

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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Continue Learning */}
            <div className="lg:col-span-3">
              {/* ... continue learning cards, playlist, etc. unchanged ... */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
      Continue Learning
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrolledCourses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No courses yet. Add a course to start learning!
        </p>
      ) : (
        enrolledCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer"
                      onClick={() =>
                        setSelectedCourse(
                          selectedCourse?.id === course.id ? null : course
                        )
                      }
                    >
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {course.instructor}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {course.progress}% Complete
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Playlist */}
                <div className="mt-4 space-y-4">
                  {course.playlist?.map((video, idx) => (
                    <div
                      key={idx}
                      className="p-3 border rounded-lg dark:border-gray-600"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {video.title}
                      </p>
                      <iframe
                        src={video.url || ""}
                        title={video.title}
                        className="w-full h-48 rounded mt-2"
                        allowFullScreen
                      />
                      {!video.completed && (
                        <motion.button
                          className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
                          onClick={() => updateProgress(course.id)}
                        >
                          Complete Lesson
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Achievements, deadlines, quick actions + consultation form */}
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

                <button
  className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
  onClick={handleViewCertificates}
>
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
