import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { profile } from '../services/backendapi';

export const fetchuser = createAsyncThunk(
  'auth/fetchuser',
  async (_ ,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken")   
      const response = await axios.get(profile, {
        headers: {
          Authorization: `${token}`
        }
      })
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Get user data from localStorage (if available)
  },
  reducers: {
     resetUser: (state) => {
      state.user = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;   // ✅ store user object
      })
  }
})

// Action creators are generated for each case reducer function
export const { resetUser } = userSlice.actions

export default userSlice.reducer