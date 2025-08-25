import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Clock, Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ← add this at the top

const FeaturedCourses: React.FC = () => {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 2847,
      duration: '40 hours',
      price: 'Free',
      originalPrice: null,
      image: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg',
      category: 'Development',
      level: 'Beginner',
      isPremium: false
    },
    {
      id: 2,
      title: 'Advanced JavaScript & ES6+',
      instructor: 'Michael Chen',
      rating: 4.8,
      students: 1923,
      duration: '32 hours',
      price: '$89',
      originalPrice: '$149',
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
      category: 'Development',
      level: 'Advanced',
      isPremium: true
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Emily Rodriguez',
      rating: 4.9,
      students: 3241,
      duration: '28 hours',
      price: '$79',
      originalPrice: '$129',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      category: 'Design',
      level: 'Intermediate',
      isPremium: true
    },
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'David Park',
      rating: 4.7,
      students: 1567,
      duration: '45 hours',
      price: 'Free',
      originalPrice: null,
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
      category: 'Data Science',
      level: 'Beginner',
      isPremium: false
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy',
      instructor: 'Lisa Thompson',
      rating: 4.8,
      students: 2103,
      duration: '25 hours',
      price: '$69',
      originalPrice: '$99',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      category: 'Marketing',
      level: 'Intermediate',
      isPremium: true
    },
    {
      id: 6,
      title: 'Mobile App Development',
      instructor: 'James Wilson',
      rating: 4.9,
      students: 1845,
      duration: '50 hours',
      price: '$99',
      originalPrice: '$179',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
      category: 'Development',
      level: 'Advanced',
      isPremium: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our most popular courses taught by industry experts. 
            Start your learning journey with both free and premium content.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.isPremium 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {course.isPremium ? 'Premium' : 'Free'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/20 text-white backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <motion.div
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="h-6 w-6 text-gray-900 ml-1" />
                  </motion.div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {course.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  by {course.instructor}
                </p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookOpen className="h-4 w-4 inline-block mr-2" />
                    Enroll Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
         <button
    onClick={() => navigate("/courses")} // ← updated this line
    className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
  >
    View All Courses
  </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCourses;