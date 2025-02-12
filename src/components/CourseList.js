import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, updateCourseLikes } from '../redux/coursesSlice';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';
import { subscribeToCourseLikes, toggleCourseLike } from '../services/likesService';

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const courses = useSelector(state => state.courses.courses);
  const [likedCourses, setLikedCourses] = useState({});
  const userId = '101'; // In a real app, get this from auth

  useEffect(() => {
    // Initialize courses with mock data
    const coursesWithLikes = mockCourses.map(course => ({
      ...course,
      likes: 0
    }));
    dispatch(setCourses(coursesWithLikes));

    // Subscribe to likes for each course
    const unsubscribes = coursesWithLikes.map(course => 
      subscribeToCourseLikes(course.id, (likes, hasLiked) => {
        dispatch(updateCourseLikes({ courseId: course.id, likes }));
        setLikedCourses(prev => ({
          ...prev,
          [course.id]: hasLiked
        }));
      }, userId)
    );

    // Cleanup subscriptions
    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [dispatch, userId]);

  const handleLikeClick = async (courseId) => {
    try {
      const hasLiked = await toggleCourseLike(courseId, userId);
      setLikedCourses(prev => ({
        ...prev,
        [courseId]: hasLiked
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Course
          </h1>
          <p className="text-lg text-gray-600">
            Expand your skills with our expert-led courses
          </p>
        </div>

        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search courses or instructors..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-4 top-4 h-6 w-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div 
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeClick(course.id);
                  }}
                  className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
                    likedCourses[course.id] 
                      ? 'bg-red-50 hover:bg-red-100' 
                      : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <svg 
                      className={`w-5 h-5 ${
                        likedCourses[course.id] ? 'text-red-500' : 'text-gray-400'
                      }`}
                      fill={likedCourses[course.id] ? 'currentColor' : 'none'}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className={`font-medium ${
                      likedCourses[course.id] ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {course.likes || 0}
                    </span>
                  </div>
                </button>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.enrollmentStatus === 'Open' 
                      ? 'bg-green-100 text-green-800'
                      : course.enrollmentStatus === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {course.enrollmentStatus}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {course.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Instructor: {course.instructor}
                </p>
                <p className="text-gray-500 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Duration: {course.duration}
                  </span>
                  <button 
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseList; 