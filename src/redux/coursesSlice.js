import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  enrolledCourses: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    markCourseCompleted: (state, action) => {
      const courseId = action.payload;
      state.enrolledCourses = state.enrolledCourses.map(course => 
        course.id === courseId ? { ...course, completed: true } : course
      );
    },
    updateCourseLikes: (state, action) => {
      const { courseId, likes } = action.payload;
      state.courses = state.courses.map(course =>
        course.id === courseId ? { ...course, likes } : course
      );
    },
  },
});

export const { 
  setCourses, 
  setEnrolledCourses, 
  markCourseCompleted, 
  updateCourseLikes 
} = coursesSlice.actions;
export default coursesSlice.reducer; 