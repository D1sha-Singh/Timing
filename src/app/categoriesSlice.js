import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    addCategory: (state, action) => {
      // console.log('disha categories action ', action)
      state.categories.push(action.payload)
    },
    removeCategory: (state, action) => {
      const newState = state?.categories?.filter( val => val !== action.payload );
      return newState
    }
  },
})

export const { addCategory, removeCategory } = categoriesSlice.actions

export default categoriesSlice.reducer

