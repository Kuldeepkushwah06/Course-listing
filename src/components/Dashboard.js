import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mockCourses } from '../data/mockCourses';
import { setEnrolledCourses, markCourseCompleted } from '../redux/coursesSlice';
import { Link } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.courses.enrolledCourses);
  const studentId = 101; // Assuming we have a logged-in user with ID 101

  useEffect(() => {
    // Filter courses where the student is enrolled and add additional properties
    const userCourses = mockCourses.filter(course => 
      course.students.some(student => student.id === studentId)
    ).map(course => ({
      ...course,
      progress: Math.floor(Math.random() * 100), // Simulated progress
      completed: false,
      dueDate: generateDueDate(), // Add due date
      lastAccessed: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString() // Random last accessed date
    }));
    dispatch(setEnrolledCourses(userCourses));
  }, [dispatch]);

  // Helper function to generate a random future due date
  const generateDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 15); // Random date between 15-45 days from now
    return date.toISOString();
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Dashboard Header with Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Learning Dashboard</h1>
          <p className="text-lg text-gray-600">Track your progress and continue learning</p>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Enrolled Courses</p>
                <h3 className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(course => course.completed).length}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.filter(course => !course.completed).length}
                </h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses List */}
        <div className="space-y-6">
          {enrolledCourses.map(course => (
            <div 
              key={course.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full md:w-48 object-cover"
                    src={course.thumbnail}
                    alt={course.name}
                  />
                </div>
                <div className="p-6 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link 
                        to={`/course/${course.id}`}
                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {course.name}
                      </Link>
                      <p className="text-gray-600 mt-1">Instructor: {course.instructor}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Last accessed: {formatDate(course.lastAccessed)}
                      </p>
                      <p className="text-sm font-medium text-red-600 mt-1">
                        Due date: {formatDate(course.dueDate)}
                      </p>
                    </div>
                    {course.completed ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => dispatch(markCourseCompleted(course.id))}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                          course.completed ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {enrolledCourses.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses enrolled</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 