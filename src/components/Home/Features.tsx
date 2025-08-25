import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ← add at the top
import { 
  BookOpen, 
  Users, 
  Award, 
  Download, 
  MessageSquare, 
  Calendar,
  Shield,
  Zap,
  Target
} from 'lucide-react';

const Features: React.FC = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of experience in their respective fields.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Interactive Learning',
      description: 'Engage with fellow students and mentors through discussions, Q&A sessions, and live workshops.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Verified Certificates',
      description: 'Earn industry-recognized certificates upon course completion to showcase your skills.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Download,
      title: 'Downloadable Resources',
      description: 'Access cheat sheets, templates, and additional materials to enhance your learning experience.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageSquare,
      title: '1-on-1 Mentoring',
      description: 'Get personalized guidance through private consultations with expert mentors.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with 24/7 access to course materials and recorded sessions.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Secure Learning',
      description: 'Your progress and personal information are protected with enterprise-grade security.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Quick Progress',
      description: 'Advanced learning algorithms help you master concepts faster with personalized learning paths.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set learning goals and track your progress with detailed analytics and insights.',
      color: 'from-teal-500 to-teal-600'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose EduPlatform?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We provide everything you need for a complete learning experience, 
            from expert instruction to community support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of students and professionals who have transformed their careers 
              through our comprehensive courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
    onClick={() => navigate("/courses")} // ← updated this line
    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Browse Courses
  </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Become a Mentor
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;