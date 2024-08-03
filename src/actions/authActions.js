import { createAsyncThunk } from '@reduxjs/toolkit'
import { userLoginRequest, userUpdateRequest } from '../service/authService'

export const userUpdate = createAsyncThunk(
  'auth/update',
  async ({ firstName, lastName }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken
      const { data } = await userUpdateRequest(firstName, lastName, token)
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
      const { data } = await userLoginRequest(email, password)
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