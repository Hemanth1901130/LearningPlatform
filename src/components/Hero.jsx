import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLaptop, FaCertificate, FaUsers } from 'react-icons/fa';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={itemVariants}
            >
              Unlock Your Potential with Interactive Learning
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl mb-8 text-indigo-100"
              variants={itemVariants}
            >
              Discover a new way to learn with our interactive courses. 
              Gain practical skills, earn certificates, and advance your career.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <Link
                to="/courses"
                className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Explore Courses
                <FaArrowRight className="ml-2" />
              </Link>
              
              <Link
                to="/signup"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center"
              >
                Sign Up Free
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6">Why Choose LearnHub?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                  <FaLaptop className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Interactive Learning</h3>
                  <p className="mt-1 text-indigo-100">
                    Engage with interactive content that makes learning enjoyable and effective.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                  <FaCertificate className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Recognized Certificates</h3>
                  <p className="mt-1 text-indigo-100">
                    Earn certificates that are recognized by top employers worldwide.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Expert Instructors</h3>
                  <p className="mt-1 text-indigo-100">
                    Learn from industry experts with real-world experience.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;