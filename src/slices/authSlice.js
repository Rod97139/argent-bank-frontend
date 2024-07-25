import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userUpdate } from '../actions/authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken: userToken,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // deletes token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      state.success = false
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.body
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.success = true
      // state.userInfo = payload
      
      state.userToken = payload.body.token
    })
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    })
      builder.addCase(userUpdate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo.firstName = payload.body.firstName
        state.userInfo.lastName = payload.body.lastName
      })
      builder.addCase(userUpdate.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

    
    // register user
    // [registerUser.pending]: (state) => {
    //   state.loading = true
    //   state.error = null
    // },
    // [registerUser.fulfilled]: (state, { payload }) => {
    //   state.loading = false
    //   state.success = true // registration successful
    // },
    // [registerUser.rejected]: (state, { payload }) => {
    //   state.loading = false
    //   state.error = payload
    // },
  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer