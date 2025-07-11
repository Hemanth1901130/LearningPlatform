import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock, FaChalkboardTeacher, FaRegPlayCircle, FaRegFileAlt, FaRegCheckCircle, FaLock, FaCertificate } from 'react-icons/fa';

// Sample course data (in a real app, this would come from an API)
const coursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'John Smith',
    instructorTitle: 'Senior Web Developer & Instructor',
    instructorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    rating: 4.8,
    reviewsCount: 2453,
    studentsCount: 12453,
    duration: '48 hours',
    level: 'Beginner',
    lastUpdated: 'June 2025',
    price: 89.99,
    category: 'Web Development',
    description: 'Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more. By the end of this course, you will be able to build complete web applications and deploy them to the internet.',
    whatYouWillLearn: [
      'Build responsive websites using HTML, CSS, and JavaScript',
      'Create dynamic web applications with React',
      'Develop backend APIs with Node.js and Express',
      'Work with databases like MongoDB and MySQL',
      'Deploy your applications to the cloud',
      'Implement authentication and authorization',
      'Optimize your applications for performance',
      'Debug and troubleshoot common issues',
    ],
    requirements: [
      'Basic computer knowledge',
      'No prior programming experience required',
      'A computer with internet access',
    ],
    modules: [
      {
        title: 'Introduction to Web Development',
        lessons: [
          { title: 'Course Overview', duration: '10:15', free: true },
          { title: 'Setting Up Your Development Environment', duration: '15:30', free: true },
          { title: 'Understanding How the Web Works', duration: '12:45', free: false },
        ],
      },
      {
        title: 'HTML Fundamentals',
        lessons: [
          { title: 'HTML Document Structure', duration: '14:20', free: true },
          { title: 'Working with Text Elements', duration: '18:45', free: false },
          { title: 'Links, Images, and Multimedia', duration: '22:10', free: false },
          { title: 'Forms and Input Elements', duration: '25:30', free: false },
        ],
      },
      {
        title: 'CSS Styling',
        lessons: [
          { title: 'CSS Selectors and Properties', duration: '20:15', free: false },
          { title: 'Box Model and Layout', duration: '23:45', free: false },
          { title: 'Flexbox and Grid', duration: '28:30', free: false },
          { title: 'Responsive Design and Media Queries', duration: '26:15', free: false },
        ],
      },
      {
        title: 'JavaScript Programming',
        lessons: [
          { title: 'JavaScript Basics', duration: '22:30', free: false },
          { title: 'DOM Manipulation', duration: '24:45', free: false },
          { title: 'Events and Event Handling', duration: '19:20', free: false },
          { title: 'Asynchronous JavaScript', duration: '27:15', free: false },
        ],
      },
      {
        title: 'React Framework',
        lessons: [
          { title: 'Introduction to React', duration: '18:30', free: false },
          { title: 'Components and Props', duration: '23:15', free: false },
          { title: 'State and Lifecycle', duration: '25:45', free: false },
          { title: 'Hooks and Context API', duration: '29:20', free: false },
        ],
      },
    ],
  },
  // More courses would be here in a real app
];

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState([0]); // First module expanded by default
  
  // Find the course by id
  const course = coursesData.find((c) => c.id === parseInt(id)) || coursesData[0];
  
  const toggleModule = (index) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter((i) => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
          <div className="relative h-80">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
                    {course.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {course.title}
                  </h1>
                  <div className="flex flex-wrap items-center text-white gap-4">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{course.rating}</span>
                      <span className="text-gray-300 ml-1">({course.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{course.studentsCount} students</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FaChalkboardTeacher className="mr-1" />
                      <span>By {course.instructor}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
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
                      activeTab === 'curriculum'
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('curriculum')}
                  >
                    Curriculum
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'instructor'
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('instructor')}
                  >
                    Instructor
                  </button>
                  <button
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'reviews'
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                    <p className="text-gray-700 mb-8">{course.description}</p>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {course.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
                    <div className="mb-4 text-gray-700">
                      <span>{course.modules.length} modules • </span>
                      <span>
                        {course.modules.reduce(
                          (total, module) => total + module.lessons.length,
                          0
                        )}{' '}
                        lessons • {course.duration} total
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {course.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                            onClick={() => toggleModule(moduleIndex)}
                          >
                            <div className="font-medium text-left">
                              <span className="text-gray-900">{module.title}</span>
                              <div className="text-sm text-gray-500">
                                {module.lessons.length} lessons • 
                                {module.lessons.reduce(
                                  (total, lesson) => {
                                    const [min, sec] = lesson.duration.split(':').map(Number);
                                    return total + min + sec / 60;
                                  },
                                  0
                                ).toFixed(0)}{' '}
                                min
                              </div>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-500 transform ${
                                expandedModules.includes(moduleIndex) ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </button>
                          
                          {expandedModules.includes(moduleIndex) && (
                            <div className="border-t border-gray-200">
                              {module.lessons.map((lesson, lessonIndex) => {
                                // Create a unique lesson ID based on module and lesson index
                                const lessonId = (moduleIndex + 1) * 100 + lessonIndex + 1;
                                
                                return (
                                  <div
                                    key={lessonIndex}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 cursor-pointer"
                                    onClick={() => {
                                      if (lesson.free) {
                                        navigate(`/courses/${id}/lessons/${lessonId}`);
                                      } else {
                                        // Show a message or prompt to enroll
                                        alert('Please enroll in this course to access this lesson');
                                      }
                                    }}
                                  >
                                    <div className="flex items-center">
                                      {lesson.free ? (
                                        <FaRegPlayCircle className="text-indigo-600 mr-3" />
                                      ) : (
                                        <FaLock className="text-gray-400 mr-3" />
                                      )}
                                      <div>
                                        <div className="text-gray-900">{lesson.title}</div>
                                        <div className="text-sm text-gray-500 flex items-center">
                                          <FaRegFileAlt className="mr-1" />
                                          <span>{lesson.duration}</span>
                                        </div>
                                      </div>
                                    </div>
                                    {lesson.free && (
                                      <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Instructor Tab */}
                {activeTab === 'instructor' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <img
                        src={course.instructorImage}
                        alt={course.instructor}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{course.instructor}</h3>
                        <p className="text-gray-600 mb-4">{course.instructorTitle}</p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="text-gray-700">4.8 Instructor Rating</span>
                          </div>
                          <div className="flex items-center">
                            <FaUsers className="text-gray-500 mr-1" />
                            <span className="text-gray-700">24,500+ Students</span>
                          </div>
                          <div className="flex items-center">
                            <FaRegPlayCircle className="text-gray-500 mr-1" />
                            <span className="text-gray-700">12 Courses</span>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          John Smith is a senior web developer with over 10 years of experience in the industry. 
                          He has worked with companies like Google, Facebook, and Amazon, and has a passion for 
                          teaching and sharing his knowledge with others. John specializes in front-end development, 
                          particularly in React and modern JavaScript.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="md:w-1/3 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
                        <div className="text-5xl font-bold text-gray-900 mb-2">{course.rating}</div>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <div className="text-gray-600">Course Rating</div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="space-y-1">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center">
                              <div className="w-12 text-gray-700 text-sm">{star} stars</div>
                              <div className="w-full h-2 bg-gray-200 rounded-full mx-2">
                                <div
                                  className="h-2 bg-yellow-400 rounded-full"
                                  style={{
                                    width: `${
                                      star === 5
                                        ? '70%'
                                        : star === 4
                                        ? '20%'
                                        : star === 3
                                        ? '7%'
                                        : star === 2
                                        ? '2%'
                                        : '1%'
                                    }`,
                                  }}
                                ></div>
                              </div>
                              <div className="w-12 text-right text-gray-700 text-sm">
                                {star === 5
                                  ? '70%'
                                  : star === 4
                                  ? '20%'
                                  : star === 3
                                  ? '7%'
                                  : star === 2
                                  ? '2%'
                                  : '1%'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Sample reviews - in a real app, these would come from an API */}
                      <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-4">
                          <img
                            src="https://randomuser.me/api/portraits/women/12.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < 5 ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                              </div>
                              <span className="text-gray-600 text-sm">2 weeks ago</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          This course exceeded my expectations! The instructor explains complex concepts in a way that's 
                          easy to understand, and the projects are practical and relevant. I've already started applying 
                          what I've learned to my own projects.
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-4">
                          <img
                            src="https://randomuser.me/api/portraits/men/45.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">Michael Brown</h4>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < 4 ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                              </div>
                              <span className="text-gray-600 text-sm">1 month ago</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          Great course with lots of valuable information. The only reason I'm giving it 4 stars instead of 5 
                          is that some of the later sections felt a bit rushed. Overall, still highly recommended for anyone 
                          looking to learn web development.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-4">
                          <img
                            src="https://randomuser.me/api/portraits/women/33.jpg"
                            alt="Reviewer"
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">Emily Davis</h4>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < 5 ? 'text-yellow-400' : 'text-gray-300'} />
                                ))}
                              </div>
                              <span className="text-gray-600 text-sm">2 months ago</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          As someone with no prior programming experience, I was worried this course might be too advanced for me. 
                          However, the instructor does an amazing job of breaking down complex topics into manageable chunks. 
                          The step-by-step approach really helped me build confidence in my coding abilities.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">${course.price}</div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaClock className="mr-1" />
                  <span>Last updated {course.lastUpdated}</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={() => {
                    // In a real app, this would call an API to enroll the user
                    alert('You have been enrolled in this course! You now have access to all lessons.');
                  }}
                >
                  Enroll Now
                </motion.button>
                
                <button className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">This course includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <FaRegPlayCircle className="text-gray-500 mr-2" />
                    <span>{course.duration} on-demand video</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaRegFileAlt className="text-gray-500 mr-2" />
                    <span>25 downloadable resources</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaRegCheckCircle className="text-gray-500 mr-2" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaUsers className="text-gray-500 mr-2" />
                    <span>Access on mobile and TV</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCertificate className="text-gray-500 mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex justify-center">
                  <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                    Share this course
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;