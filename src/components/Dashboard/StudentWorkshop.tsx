// src/components/Dashboard/StudentWorkshop.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import { toast } from "react-hot-toast";

type Workshop = {
  id: number;
  title: string;
  date: string;
  time: string;
  instructor: string;
  attendees: number;
};

const StudentWorkshop: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: 1,
      title: "React Advanced Patterns",
      date: "Sept 10, 2025",
      time: "2:00 PM - 4:00 PM",
      instructor: "John Doe",
      attendees: 25,
    },
    {
      id: 2,
      title: "JavaScript ES2025 Features",
      date: "Sept 12, 2025",
      time: "11:00 AM - 1:00 PM",
      instructor: "Sarah Smith",
      attendees: 30,
    },
    {
      id: 3,
      title: "Node.js & Express Workshop",
      date: "Sept 15, 2025",
      time: "3:00 PM - 5:00 PM",
      instructor: "Mike Johnson",
      attendees: 18,
    },
  ]);

  const enrollWorkshop = (id: number) => {
    setWorkshops((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, attendees: w.attendees + 1 } : w
      )
    );
    toast.success("Successfully Enrolled!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Upcoming Workshops
          </h1>

          <div className="space-y-6">
            {workshops.map((workshop) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {workshop.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {workshop.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {workshop.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {workshop.attendees} attendees
                  </div>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                  Instructor: {workshop.instructor}
                </p>
                <motion.button
                  onClick={() => enrollWorkshop(workshop.id)}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enroll Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentWorkshop;
