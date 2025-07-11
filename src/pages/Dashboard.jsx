import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaChartLine, FaBookmark, FaCertificate, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
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

// Sample lessons data
const sampleLessons = [
  {
    id: 101,
    courseId: 1,
    title: 'Introduction to HTML',
    thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890',
  },
  {
    id: 302,
    courseId: 3,
    title: 'Python Basics for Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0',
  },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Get enrolled courses
  const enrolledCourses = allCourses.filter((course) =>
    currentUser.enrolledCourses?.includes(course.id)
  );

  // Get bookmarked lessons
  const bookmarkedLessons = sampleLessons.filter((lesson) =>
    currentUser.bookmarkedLessons?.includes(lesson.id)
  );

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (!currentUser.enrolledCourses || currentUser.enrolledCourses.length === 0) {
      return 0;
    }

    // In a real app, this would be calculated based on completed lessons vs total lessons
    const completedLessonsCount = currentUser.completedLessons?.length || 0;
    const inProgressLessonsCount = currentUser.lessonProgress?.length || 0;
    
    // Assuming each course has 10 lessons on average
    const totalLessonsEstimate = currentUser.enrolledCourses.length * 10;
    
    // Count in-progress lessons as 50% complete
    const progressScore = completedLessonsCount + (inProgressLessonsCount * 0.5);
    
    return Math.min(Math.round((progressScore / totalLessonsEstimate) * 100), 100);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your progress and manage your learning journey</p>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'courses'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('courses')}
              >
                My Courses
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'bookmarks'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('bookmarks')}
              >
                Bookmarks
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'certificates'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('certificates')}
              >
                Certificates
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Progress Card */}
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 text-white shadow-md">
                    <div className="flex items-center mb-4">
                      <FaChartLine className="text-2xl mr-3" />
                      <h3 className="text-xl font-semibold">Overall Progress</h3>
                    </div>
                    <div className="mb-4">
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5">
                        <div
                          className="bg-white h-2.5 rounded-full"
                          style={{ width: `${overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold">{overallProgress}%</div>
                    <p className="text-white text-opacity-80 mt-1">Keep up the good work!</p>
                  </div>

                  {/* Courses Card */}
                  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                    <div className="flex items-center mb-4">
                      <FaBook className="text-2xl text-indigo-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">My Courses</h3>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {enrolledCourses.length}
                    </div>
                    <p className="text-gray-600 mt-1">Courses enrolled</p>
                    <Link
                      to="/courses"
                      className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Browse more courses
                    </Link>
                  </div>

                  {/* Certificates Card */}
                  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                    <div className="flex items-center mb-4">
                      <FaCertificate className="text-2xl text-indigo-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Certificates</h3>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">0</div>
                    <p className="text-gray-600 mt-1">Certificates earned</p>
                    <p className="mt-4 text-gray-500">
                      Complete courses to earn certificates
                    </p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {currentUser.completedLessons && currentUser.completedLessons.length > 0 ? (
                      currentUser.completedLessons.slice(0, 3).map((lesson, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-green-100 p-2 rounded-full mr-4">
                            <FaGraduationCap className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">
                              Completed a lesson in Course {lesson.courseId}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No recent activity</p>
                    )}
                  </div>
                </div>

                {/* Learning Schedule */}
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Learning Schedule</h3>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Add to Calendar
                    </button>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-indigo-600 mr-3" />
                      <div>
                        <p className="text-gray-900 font-medium">
                          Set your learning goals and schedule
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Create a consistent learning routine to maximize your progress
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* My Courses Tab */}
            {activeTab === 'courses' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">My Enrolled Courses</h3>
                
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
              </motion.div>
            )}

            {/* Bookmarks Tab */}
            {activeTab === 'bookmarks' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Bookmarked Lessons</h3>
                
                {bookmarkedLessons.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarkedLessons.map((lesson) => (
                      <div key={lesson.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900 mb-2">{lesson.title}</h4>
                          <Link
                            to={`/courses/${lesson.courseId}/lessons/${lesson.id}`}
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                          >
                            Continue Learning
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaBookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                    <p className="text-gray-600 mb-6">
                      Bookmark lessons to easily access them later
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">My Certificates</h3>
                
                <div className="text-center py-12">
                  <FaCertificate className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No certificates yet</h3>
                  <p className="text-gray-600 mb-6">
                    Complete courses to earn your first certificate
                  </p>
                  <Link
                    to="/courses"
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Browse Courses
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;