import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const userapi = import.meta.env.VITE_API_BASE_URL_USER;

const tokenFromStorage = localStorage.getItem('authToken');
let decodedRole = null;

if (tokenFromStorage) {
  try {
    const decoded = jwtDecode(tokenFromStorage);
    decodedRole = decoded.role;
  } catch (error) {
    console.error("Token decoding failed:", error);
  }
}

export const signupuser = createAsyncThunk(
  'auth/signupuser',
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${userapi}/signup`, userdata)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const signinuser = createAsyncThunk(
  'auth/signinuser',
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${userapi}/signin`, userdata)
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', response.data.token);
        try {
          const decoded = jwtDecode(token);
          return {
            token,
            role: decoded.role, // send role explicitly
          };
        } catch (err) {
          console.error("JWT decode failed in thunk:", err);
          return rejectWithValue("Invalid token");
        }
      }

    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('authToken') || null,
    role: decodedRole,
    loading: false
  },
  reducers: {
    signout: (state) => {
      state.token = null
      state.role = null;
      localStorage.removeItem('authToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupuser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signinuser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Save token after successful signin
        state.role = action.payload.role; // Save token after successful signin

      })
  }
})

// Action creators are generated for each case reducer function
export const { signout } = authSlice.actions

export default authSlice.reducer