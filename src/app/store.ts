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

// we gonna use useSelector and useDispatch so we would need these types in
// future if we want to use them

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
