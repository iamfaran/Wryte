import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { client } from '@/api/client'
import { log } from 'node:console'

export const login = createAppAsyncThunk('auth/login', async (username: string) => {
  // pass the argument if we want to pass data to the thunk
  await client.post('/fakeApi/login', { username })
  // username would be a payload of the thunk
  // which will be passed in builder addCase
  return username
})

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await client.post('/fakeApi/logout', {})
})

interface AuthState {
  username: string | null
}

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.username = null
      })
  },
})

export const selectCurrentUsername = (state: RootState) => state.auth.username

export default authSlice.reducer
