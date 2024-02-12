import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    logOut:(state)=>{
        state.value=null;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setUser,logOut } = userSlice.actions;

export default userSlice.reducer;