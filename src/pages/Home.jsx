import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import { FaChalkboardTeacher, FaBook, FaUserGraduate } from 'react-icons/fa';

// Sample course data (in a real app, this would come from an API)
const featuredCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    rating: 4.8,
    studentsCount: 12453,
    duration: '48 hours',
    level: 'Beginner',
    price: 89.99,
  },
  {
    id: 2,
    title: 'Advanced JavaScript: From Fundamentals to Functional JS',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    rating: 4.9,
    studentsCount: 8765,
    duration: '36 hours',
    level: 'Intermediate',
    price: 69.99,
  },
  {
    id: 3,
    title: 'Data Science and Machine Learning with Python',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    rating: 4.7,
    studentsCount: 9876,
    duration: '52 hours',
    level: 'Advanced',
    price: 99.99,
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emma Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    rating: 4.6,
    studentsCount: 6543,
    duration: '28 hours',
    level: 'Beginner',
    price: 59.99,
  },
];

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Courses
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our most popular courses and start your learning journey today.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              View All Courses
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaChalkboardTeacher className="w-12 h-12 mx-auto mb-4 text-indigo-300" />
              <h3 className="text-4xl font-bold mb-2">100+</h3>
              <p className="text-xl text-indigo-200">Expert Instructors</p>
            </motion.div>
            
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FaBook className="w-12 h-12 mx-auto mb-4 text-indigo-300" />
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-xl text-indigo-200">Interactive Courses</p>
            </motion.div>
            
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaUserGraduate className="w-12 h-12 mx-auto mb-4 text-indigo-300" />
              <h3 className="text-4xl font-bold mb-2">50,000+</h3>
              <p className="text-xl text-indigo-200">Satisfied Students</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our learning platform is designed to make your educational journey seamless and effective.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose a Course</h3>
              <p className="text-gray-600">Browse our extensive library of courses and find the perfect match for your goals.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learn at Your Pace</h3>
              <p className="text-gray-600">Access course materials anytime, anywhere, and learn at a pace that suits your schedule.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Certified</h3>
              <p className="text-gray-600">Complete your course, pass the assessments, and earn a recognized certificate.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students who are already advancing their careers with LearnHub.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-md hover:bg-gray-100 transition-colors text-lg"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;