import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:3001/api/v1'

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//       await axios.post(
//         `${backendURL}/user/login`,
//         { email, password },
//         config
//       )
//     } catch (error) {
//     // return custom error message from backend if present
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

// export const userProfile = createAsyncThunk(
//   'auth/profile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       }
//       const { data } = await axios.get(`${backendURL}/user/profile`, config)
//       return data
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

export const userUpdate = createAsyncThunk(
  'auth/update',
  async ({ firstName, lastName }, { rejectWithValue, getState }) => {
    try {
      
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.put(
        `${backendURL}/user/profile`,
        {
          "firstName": firstName,
          "lastName": lastName
        },
        config
      )
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/user/login`,
        { email, password },
        config
      )
      // store user's token in local storage
      rememberMe ? localStorage.setItem('userToken', data.body.token) : localStorage.removeItem('userToken')
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)