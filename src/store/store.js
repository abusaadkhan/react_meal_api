import { configureStore } from '@reduxjs/toolkit'
import  categorySlice  from '../features/categorySlice'
import mealNameSlice from '../features/mealNameSlice'

export const store = configureStore({
    reducer: {
        meal : categorySlice,
        mealName : mealNameSlice,
    },
})