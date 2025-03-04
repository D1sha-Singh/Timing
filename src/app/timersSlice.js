import { createSlice } from '@reduxjs/toolkit'

export const timersSlice = createSlice({
  name: 'timer',
  initialState: {
    timers: [],
    completedTimers: []
  },
  reducers: {
    addTimer: (state, action) => {
      // console.log('disha timer action ', action)
      state.timers.push(action.payload)
    },
    addCompletedTimer: (state, action) => {
      if (!state.completedTimers) {
        state.completedTimers = []; // Ensure the array exists
      }
      state.completedTimers.push(action.payload);
    }
  },
})

export const { addTimer, addCompletedTimer } = timersSlice.actions

export default timersSlice.reducer