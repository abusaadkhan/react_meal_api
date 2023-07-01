import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

export const categorySlice = createSlice({
    name:'meal',
    initialState,
    reducers:{
        randomId: (state,action) => {
            state.value = action.payload
            console.log('randomId getting in store:',action);
        },
        
    }
})

export const {randomId } = categorySlice.actions
export default categorySlice.reducer