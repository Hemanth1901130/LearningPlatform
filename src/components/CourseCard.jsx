import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    instructor,
    thumbnail,
    rating,
    studentsCount,
    duration,
    level,
    price,
  } = course;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <Link to={`/courses/${id}`}>
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
            {level}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          
          <p className="text-gray-600 text-sm mb-3">by {instructor}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center text-yellow-500 mr-2">
              <FaStar />
              <span className="ml-1 text-gray-700">{rating}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <FaUsers className="mr-1" />
              <span>{studentsCount} students</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <FaClock className="mr-1" />
            <span>{duration}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800 text-lg">
              {price === 0 ? 'Free' : `$${price}`}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Course
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;