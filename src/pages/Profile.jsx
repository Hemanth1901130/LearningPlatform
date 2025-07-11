import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaGraduationCap, FaBook, FaCertificate } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

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
];

const Profile = () => {
  const { currentUser, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [activeTab, setActiveTab] = useState('courses');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validate form
    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Update profile
    const updatedData = {
      name: formData.name,
    };

    // Only include password if it was changed
    if (formData.password) {
      updatedData.password = formData.password;
    }

    const success = updateProfile(updatedData);
    if (success) {
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    } else {
      setErrorMessage('Failed to update profile');
    }
  };

  // Get enrolled courses
  const enrolledCourses = allCourses.filter((course) =>
    currentUser.enrolledCourses?.includes(course.id)
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 text-center border-b border-gray-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.role === 'instructor' ? 'Instructor' : 'Student'}</p>
              </div>
              
              <div className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`w-full flex items-center px-4 py-2 rounded-md ${
                      activeTab === 'courses'
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaBook className="mr-3" />
                    My Courses
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('certificates')}
                    className={`w-full flex items-center px-4 py-2 rounded-md ${
                      activeTab === 'certificates'
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaCertificate className="mr-3" />
                    Certificates
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`w-full flex items-center px-4 py-2 rounded-md ${
                      activeTab === 'account'
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaUser className="mr-3" />
                    Account Settings
                  </button>
                </nav>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* My Courses Tab */}
              {activeTab === 'courses' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
                  
                  {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enrolledCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FaGraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No courses yet</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't enrolled in any courses yet. Start learning today!
                      </p>
                      <Link
                        to="/courses"
                        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Browse Courses
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Certificates</h2>
                  
                  <div className="text-center py-12">
                    <FaCertificate className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No certificates yet</h3>
                    <p className="text-gray-600 mb-6">
                      Complete a course to earn your first certificate.
                    </p>
                    <Link
                      to="/courses"
                      className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Browse Courses
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Account Settings Tab */}
              {activeTab === 'account' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                    )}
                  </div>
                  
                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                      {successMessage}
                    </div>
                  )}
                  
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                      {errorMessage}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2 border ${
                              isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-gray-50"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Email address cannot be changed</p>
                      </div>
                      
                      {isEditing && (
                        <>
                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                              </div>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Leave blank to keep current password</p>
                          </div>
                          
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                              </div>
                              <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div className="mt-8 flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              ...formData,
                              name: currentUser.name,
                              password: '',
                              confirmPassword: '',
                            });
                            setErrorMessage('');
                            setSuccessMessage('');
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;