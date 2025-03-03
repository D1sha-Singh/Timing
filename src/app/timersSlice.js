import { createSlice } from '@reduxjs/toolkit'

export const timersSlice = createSlice({
  name: 'timer',
  initialState: {
    timers: [],
  },
  reducers: {
    addTimer: (state, action) => {
      // console.log('disha timer action ', action)
      state.timers.push(action.payload)
    }
  },
})

export const { addTimer } = timersSlice.actions

export default timersSlice.reducer