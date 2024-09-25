// src/store/slices/scheduledCoursesSlice.js 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteScheduledCoursesAndAgenda, getAllDocuments, upsertDocument, upsertScheduledCoursesAndAgenda } from '../../utils/firebaseDB';

// Estado inicial
const initialState = {
  scheduledCourses: [],
  status: 'idle',
  error: null,
};

// Thunk para obtener todas las reservas desde Firebase
export const fetchScheduledCourses = createAsyncThunk('scheduledCourses/fetchScheduledCourses', async () => {
  const courses = await getAllDocuments("Scheduled Courses");
  return courses;
});

// Thunk para agregar una nueva reserva
export const addScheduledCourses = createAsyncThunk('scheduledCourses/addScheduledCourses', async (newScheduled) => {
  const addedCourse = await upsertScheduledCoursesAndAgenda("Scheduled Courses", ...newScheduled);
  return addedCourse;
});

// Thunk para editar una reserva
export const updateScheduledCourses = createAsyncThunk('scheduledCourses/updateScheduledCourses', async ({ id, data }) => {
  const updatedCourse = await upsertScheduledCoursesAndAgenda("Scheduled Courses", id, data);
  return updatedCourse;
});

// Thunk para eliminar una reserva
export const deleteScheduledCourses = createAsyncThunk('scheduledCourses/deleteScheduledCourses', async (id) => {
  await deleteScheduledCoursesAndAgenda(id);
  return id;
});

// Slice de reservas
const scheduledCoursesSlice = createSlice({
  name: 'scheduledCourses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch reservas
      .addCase(fetchScheduledCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchScheduledCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.scheduledCourses = action.payload;
      })
      .addCase(fetchScheduledCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add reserva
      .addCase(addScheduledCourses.fulfilled, (state, action) => {
        state.scheduledCourses.push(action.payload);
      })
      // Update reserva
      .addCase(updateScheduledCourses.fulfilled, (state, action) => {
        const index = state.scheduledCourses.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.scheduledCourses[index] = action.payload;
        }
      })
      // Delete reserva
      .addCase(deleteScheduledCourses.fulfilled, (state, action) => {
        state.scheduledCourses = state.scheduledCourses.filter((r) => r.id !== action.payload);
      });
  },
});

export default scheduledCoursesSlice.reducer;