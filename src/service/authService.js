import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

const backendURL = 'http://localhost:3001/api/v1'

export const userLoginRequest = async (email, password) => {
  return await axios.post(
    `${backendURL}/user/login`,
    { email, password },
    //config
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export const userUpdateRequest = async (firstName, lastName, token) => {
   return await axios.put(
      `${backendURL}/user/profile`,
      {
        "firstName": firstName,
        "lastName": lastName
      },
      //config
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
}

export const authApi = createApi({
    
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: backendURL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
       // include token in req header
        headers.set('authorization', `Bearer ${token}`)  
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'POST',
      }),
    }),
  }),
})

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi