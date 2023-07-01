import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

export const mealNameSlice = createSlice({
    name:'mealName',
    initialState,
    reducers:{
        id: (state,action) => {
            state.value = action.payload
            console.log('Id mealname slice getting in store:',action);
        },
        
    }
})

export const {id } = mealNameSlice.actions
export default mealNameSlice.reducer
