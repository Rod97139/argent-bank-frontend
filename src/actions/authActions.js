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

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
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
      console.log(data);
      localStorage.setItem('userToken', data.body.token)
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