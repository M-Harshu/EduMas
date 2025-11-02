import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    'Learn': [
      { name: 'Browse Courses', path: '/courses' },
    ],
    'Teach': [
      { name: 'Become a Mentor', path: '/signup' },
      { name: 'Mentor Resources', path: '/mentor-resources' },
      { name: 'Teaching Guidelines', path: '/teaching-guidelines' },
      { name: 'Earnings', path: '/earnings' }
    ],
    'Support': [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Community', path: '/community' },
      { name: 'FAQ', path: '/faq' }
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Career', path: '/career' },
      { name: 'Blog', path: '/blog' },
      { name: 'Press', path: '/press' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/', label: 'Twitter' },
    { icon: Instagram, href: 'http://instagram.com/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://in.linkedin.com/', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduPlatform</span>
            </Link>
            <p className="mb-6 max-w-md">
              Empowering learners worldwide with expert-led courses, interactive learning experiences, and recognized certifications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      to={path}
                      className="hover:text-white transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 EduPlatform. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
