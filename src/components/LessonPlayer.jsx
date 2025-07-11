import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCog, FaCheck } from 'react-icons/fa';

const LessonPlayer = ({ lesson, onComplete, initialProgress = 0, onProgressUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Simulate video progress
  React.useEffect(() => {
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            if (onComplete) onComplete();
            return 100;
          }
          // Call the progress update callback if provided
          if (onProgressUpdate && newProgress % 5 === 0) { // Update every 5% to avoid too many updates
            onProgressUpdate(newProgress);
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, onComplete, onProgressUpdate]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate current time based on progress
  const totalDuration = 1500; // 25 minutes in seconds
  const currentTime = (progress / 100) * totalDuration;

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
      {/* Video display area */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-indigo-600 bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-colors"
            >
              <FaPlay className="text-3xl ml-1" />
            </button>
          </motion.div>
        )}
        
        {/* Lesson title overlay */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded text-white">
          {lesson?.title || 'Introduction to Web Development'}
        </div>
        
        {/* Video thumbnail or placeholder */}
        <img
          src={lesson?.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'}
          alt={lesson?.title || 'Lesson thumbnail'}
          className={`w-full h-full object-cover ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Progress bar */}
          <div className="relative h-1 bg-gray-600 rounded-full mb-4 cursor-pointer">
            <div
              className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause button */}
              <button onClick={togglePlay} className="text-white hover:text-indigo-400 transition-colors">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              
              {/* Volume control */}
              <div className="relative">
                <button
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  className="text-white hover:text-indigo-400 transition-colors"
                >
                  {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                
                {showVolumeSlider && (
                  <div
                    className="absolute bottom-8 left-0 bg-gray-800 p-2 rounded shadow-lg"
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 accent-indigo-600"
                    />
                  </div>
                )}
              </div>
              
              {/* Time display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Settings button */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-indigo-400 transition-colors"
                >
                  <FaCog />
                </button>
                
                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-gray-800 p-2 rounded shadow-lg w-40">
                    <div className="text-white text-sm mb-2">Playback Speed</div>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                          className={`px-2 py-1 rounded text-xs ${
                            playbackSpeed === speed
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Fullscreen button */}
              <button className="text-white hover:text-indigo-400 transition-colors">
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lesson information */}
      <div className="p-4 bg-gray-800 text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{lesson?.title || 'Introduction to Web Development'}</h3>
          <button
            onClick={onComplete}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm transition-colors"
          >
            <FaCheck className="mr-1" /> Mark as Complete
          </button>
        </div>
        <p className="text-gray-300">
          {lesson?.description ||
            'Learn the fundamentals of web development, including HTML, CSS, and JavaScript. This lesson covers the basic building blocks of the web and how they work together.'}
        </p>
      </div>
    </div>
  );
};

export default LessonPlayer;