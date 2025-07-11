import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Sample course data (in a real app, this would come from an API)
const allCourses = [
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
    category: 'Web Development',
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
    category: 'Web Development',
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
    category: 'Data Science',
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
    category: 'Design',
  },
  {
    id: 5,
    title: 'Mobile App Development with React Native',
    instructor: 'David Lee',
    thumbnail: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
    rating: 4.5,
    studentsCount: 5432,
    duration: '40 hours',
    level: 'Intermediate',
    price: 79.99,
    category: 'Mobile Development',
  },
  {
    id: 6,
    title: 'Python for Beginners: Learn Programming Basics',
    instructor: 'Lisa Wang',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    rating: 4.8,
    studentsCount: 15678,
    duration: '32 hours',
    level: 'Beginner',
    price: 49.99,
    category: 'Programming',
  },
  {
    id: 7,
    title: 'Digital Marketing Masterclass',
    instructor: 'Robert Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    rating: 4.7,
    studentsCount: 8765,
    duration: '38 hours',
    level: 'Intermediate',
    price: 69.99,
    category: 'Marketing',
  },
  {
    id: 8,
    title: 'Blockchain and Cryptocurrency Fundamentals',
    instructor: 'Alex Thompson',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
    rating: 4.6,
    studentsCount: 4321,
    duration: '30 hours',
    level: 'Intermediate',
    price: 89.99,
    category: 'Blockchain',
  },
];

const categories = [
  'All Categories',
  'Web Development',
  'Data Science',
  'Design',
  'Mobile Development',
  'Programming',
  'Marketing',
  'Blockchain',
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [priceRange, setPriceRange] = useState(100);
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search term, category, level, and price
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    const matchesPrice = course.price <= priceRange;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Our Courses
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover a wide range of courses to help you achieve your learning goals.
          </motion.p>
        </div>
        
        {/* Search and Filter */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses or instructors..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="md:w-auto w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <motion.div 
              className="bg-white p-6 rounded-md shadow-md mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Category</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Level</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Price Range: ${priceRange}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    className="w-full"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-gray-500 text-sm mt-1">
                    <span>$0</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Results count */}
        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Showing {filteredCourses.length} of {allCourses.length} courses
        </motion.p>
        
        {/* Course grid */}
        {filteredCourses.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;