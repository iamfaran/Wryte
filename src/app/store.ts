import { configureStore } from '@reduxjs/toolkit'
import type { Action } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}
// Mock Reducer for understanding how Redux Toolkit works

function counterReducer(state: CounterState = { value: 0 }, action: Action) {
  switch (action.type) {
    default:
      return state
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
