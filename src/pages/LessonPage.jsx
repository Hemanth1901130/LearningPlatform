import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaListUl, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import LessonPlayer from '../components/LessonPlayer';
import { useAuth } from '../context/AuthContext';

const sampleLessons = [
  {
    id: 1,
    courseId: 1,
    title: 'Introduction to HTML',
    description: 'Learn the basics of HTML, the building block of the web. This lesson covers elements, attributes, and document structure.',
    duration: '15:30',
    thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890',
    videoUrl: 'https://example.com/videos/intro-to-html',
  },
  {
    id: 2,
    courseId: 1,
    title: 'CSS Fundamentals',
    description: 'Discover how to style your HTML with CSS. Learn about selectors, properties, and the box model.',
    duration: '18:45',
    thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19',
    videoUrl: 'https://example.com/videos/css-fundamentals',
  },
  {
    id: 3,
    courseId: 1,
    title: 'JavaScript Basics',
    description: 'Get started with JavaScript programming. Learn about variables, functions, and basic DOM manipulation.',
    duration: '22:15',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a',
    videoUrl: 'https://example.com/videos/javascript-basics',
  },
  {
    id: 4,
    courseId: 1,
    title: 'Responsive Web Design',
    description: 'Learn how to make your websites look great on all devices using responsive design techniques.',
    duration: '20:00',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
    videoUrl: 'https://example.com/videos/responsive-design',
  },
];

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const {
    currentUser,
    updateProgress,
    getLessonProgress,
    toggleBookmark,
    isBookmarked,
    isEnrolled
  } = useAuth();
  
  const [lesson, setLesson] = useState(null);
  const [courseLessons, setCourseLessons] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLessonList, setShowLessonList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkEnrollment = () => {
      if (!currentUser) {
        setError('Please log in to access this lesson');
        return false;
      }
      
      const enrolled = isEnrolled(parseInt(courseId));
      
      if (!enrolled) {
        setError('Please enroll in this course to access this lesson');
        return false;
      }
      
      return true;
    };
    
    const fetchLesson = () => {
      try {
        setLoading(true);
        
        if (!checkEnrollment()) {
          setLoading(false);
          return;
        }
        
        const currentLesson = sampleLessons.find(
          (l) => l.id === parseInt(lessonId) && l.courseId === parseInt(courseId)
        );
        
        if (!currentLesson) {
          setError('Lesson not found');
          return;
        }
        
        setLesson(currentLesson);
        
        const lessonsForCourse = sampleLessons.filter(
          (l) => l.courseId === parseInt(courseId)
        );
        
        setCourseLessons(lessonsForCourse);
        
        const lessonBookmarked = isBookmarked(parseInt(lessonId));
        setBookmarked(lessonBookmarked);
        
        const lessonProgress = getLessonProgress(parseInt(courseId), parseInt(lessonId));
        setProgress(lessonProgress);
      } catch (err) {
        setError('Failed to load lesson');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLesson();
  }, [courseId, lessonId, currentUser, isEnrolled, isBookmarked, getLessonProgress]);

  const handleLessonComplete = () => {
    updateProgress(parseInt(courseId), parseInt(lessonId), 100);
    
    const currentIndex = courseLessons.findIndex((l) => l.id === parseInt(lessonId));
    if (currentIndex < courseLessons.length - 1) {
      const nextLesson = courseLessons[currentIndex + 1];
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
    }
  };

  const handleToggleBookmark = () => {
    const success = toggleBookmark(parseInt(lessonId));
    if (success) {
      setBookmarked(!bookmarked);
    }
  };
  
  const handleProgressUpdate = (newProgress) => {
    updateProgress(parseInt(courseId), parseInt(lessonId), newProgress);
    setProgress(newProgress);
  };

  const navigateToLesson = (id) => {
    navigate(`/courses/${courseId}/lessons/${id}`);
    setShowLessonList(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <Link
          to={`/courses/${courseId}`}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Course
        </Link>
      </div>
    );
  }

  const currentIndex = courseLessons.findIndex((l) => l.id === parseInt(lessonId));
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            to={`/courses/${courseId}`}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Course
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleBookmark}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {bookmarked ? <FaBookmark className="mr-1" /> : <FaRegBookmark className="mr-1" />}
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            
            <button
              onClick={() => setShowLessonList(!showLessonList)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <FaListUl className="mr-1" /> Lessons
            </button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LessonPlayer
            lesson={lesson}
            onComplete={handleLessonComplete}
            initialProgress={progress}
            onProgressUpdate={handleProgressUpdate}
          />
        </motion.div>
        
        <div className="mt-8 flex justify-between">
          {prevLesson ? (
            <button
              onClick={() => navigateToLesson(prevLesson.id)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Previous Lesson
            </button>
          ) : (
            <div></div>
          )}
          
          {nextLesson ? (
            <button
              onClick={() => navigateToLesson(nextLesson.id)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Next Lesson <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors"
            >
              Complete Course <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>
        
        {showLessonList && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Course Lessons</h3>
                <button
                  onClick={() => setShowLessonList(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <ul className="space-y-2">
                {courseLessons.map((courseLesson) => (
                  <li key={courseLesson.id}>
                    <button
                      onClick={() => navigateToLesson(courseLesson.id)}
                      className={`w-full text-left p-3 rounded-md ${
                        courseLesson.id === parseInt(lessonId)
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{courseLesson.title}</span>
                        <span className="text-xs text-gray-500">{courseLesson.duration}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;