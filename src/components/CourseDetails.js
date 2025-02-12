import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState(null);

  useEffect(() => {
    // Find course from mock data
    const foundCourse = mockCourses.find(c => c.id === parseInt(id));
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [id]);

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section with Course Name and Instructor */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-64 relative">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
              <p className="text-lg opacity-90">Instructor: {course.instructor}</p>
            </div>
          </div>

          {/* Course Status and Quick Info */}
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                course.enrollmentStatus === 'Open' 
                  ? 'bg-green-100 text-green-800'
                  : course.enrollmentStatus === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                Status: {course.enrollmentStatus}
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Duration: {course.duration}
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Location: {course.location}
              </span>
            </div>

            {/* Course Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About this Course</h2>
              <p className="text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Schedule Information */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-semibold mb-3">Schedule</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">{course.schedule}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prerequisites Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
          <ul className="space-y-3">
            {course.prerequisites.map((prereq, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {prereq}
              </li>
            ))}
          </ul>
        </div>

        {/* Syllabus Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Course Syllabus</h2>
          <div className="space-y-4">
            {course.syllabus.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-300"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  onClick={() => setExpandedWeek(expandedWeek === index ? null : index)}
                >
                  <div>
                    <span className="text-sm text-blue-600 font-medium">Week {item.week}</span>
                    <h3 className="text-lg font-medium text-gray-900 mt-1">{item.topic}</h3>
                  </div>
                  <svg
                    className={`h-6 w-6 text-gray-400 transform transition-transform ${
                      expandedWeek === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedWeek === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails; 