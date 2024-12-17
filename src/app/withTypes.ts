import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'

// below are the types for the createAsyncThunk

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
