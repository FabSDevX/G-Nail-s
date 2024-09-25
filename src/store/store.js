// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import ScheduledCoursesReducer from './slices/ScheduledCoursesSlice';

const store = configureStore({
  reducer: {
    scheduledCourses: ScheduledCoursesReducer,
  },
});

export default store;
