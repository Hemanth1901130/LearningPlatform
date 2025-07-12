import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const sampleUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'student',
    enrolledCourses: [1, 3],
    completedLessons: [
      { courseId: 1, lessonId: 1 },
      { courseId: 1, lessonId: 2 },
    ],
    lessonProgress: [
      { courseId: 1, lessonId: 3, progress: 45 }, 
      { courseId: 3, lessonId: 1, progress: 20 },
    ],
    bookmarkedLessons: [101, 302],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'instructor',
    teachingCourses: [1, 2],
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setError('');
    
    const user = sampleUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  const register = (name, email, password) => {
    setError('');
    
    const existingUser = sampleUsers.find((u) => u.email === email);
    
    if (existingUser) {
      setError('User with this email already exists');
      return false;
    }
    
    const newUser = {
      id: sampleUsers.length + 1,
      name,
      email,
      password,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      role: 'student',
      enrolledCourses: [],
      completedLessons: [],
      lessonProgress: [],
      bookmarkedLessons: [],
    };
    
    sampleUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const enrollInCourse = (courseId) => {
    if (!currentUser) return false;
    
    if (currentUser.enrolledCourses && currentUser.enrolledCourses.includes(courseId)) {
      return true;
    }
    
    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...(currentUser.enrolledCourses || []), courseId],
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  const completeLesson = (courseId, lessonId) => {
    if (!currentUser) return false;
    
    const alreadyCompleted = currentUser.completedLessons?.some(
      (lesson) => lesson.courseId === courseId && lesson.lessonId === lessonId
    );
    
    if (alreadyCompleted) {
      return true;
    }
    
    const updatedUser = {
      ...currentUser,
      completedLessons: [
        ...(currentUser.completedLessons || []),
        { courseId, lessonId },
      ],
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  const isLessonCompleted = (courseId, lessonId) => {
    if (!currentUser || !currentUser.completedLessons) return false;
    
    return currentUser.completedLessons.some(
      (lesson) => lesson.courseId === courseId && lesson.lessonId === lessonId
    );
  };

  const isEnrolled = (courseId) => {
    if (!currentUser || !currentUser.enrolledCourses) return false;
    
    return currentUser.enrolledCourses.includes(courseId);
  };

  const updateProgress = (courseId, lessonId, progress = 100) => {
    if (!currentUser) return false;
    
    if (progress >= 100) {
      completeLesson(courseId, lessonId);
    }
    
    const existingProgressIndex = currentUser.lessonProgress?.findIndex(
      (item) => item.courseId === courseId && item.lessonId === lessonId
    );
    
    let updatedProgress;
    
    if (existingProgressIndex >= 0) {
      updatedProgress = [...(currentUser.lessonProgress || [])];
      updatedProgress[existingProgressIndex] = {
        ...updatedProgress[existingProgressIndex],
        progress: Math.max(updatedProgress[existingProgressIndex].progress, progress),
      };
    } else {
      updatedProgress = [
        ...(currentUser.lessonProgress || []),
        { courseId, lessonId, progress },
      ];
    }
    
    const updatedUser = {
      ...currentUser,
      lessonProgress: updatedProgress,
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };
  
  const getLessonProgress = (courseId, lessonId) => {
    if (!currentUser || !currentUser.lessonProgress) return 0;
    
    const progressEntry = currentUser.lessonProgress.find(
      (item) => item.courseId === courseId && item.lessonId === lessonId
    );
    
    return progressEntry ? progressEntry.progress : 0;
  };
  
  const toggleBookmark = (lessonId) => {
    if (!currentUser) return false;
    
    let updatedBookmarks;
    
    if (currentUser.bookmarkedLessons?.includes(lessonId)) {
      updatedBookmarks = currentUser.bookmarkedLessons.filter(id => id !== lessonId);
    } else {
      updatedBookmarks = [...(currentUser.bookmarkedLessons || []), lessonId];
    }
    
    const updatedUser = {
      ...currentUser,
      bookmarkedLessons: updatedBookmarks,
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };
  
  const isBookmarked = (lessonId) => {
    if (!currentUser || !currentUser.bookmarkedLessons) return false;
    
    return currentUser.bookmarkedLessons.includes(lessonId);
  };
  
  const updateProfile = (updatedData) => {
    if (!currentUser) return false;
    
    const updatedUser = {
      ...currentUser,
      ...updatedData,
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    enrollInCourse,
    completeLesson,
    isLessonCompleted,
    isEnrolled,
    updateProgress,
    getLessonProgress,
    toggleBookmark,
    isBookmarked,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};