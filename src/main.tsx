//  roboto font MUI
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import { worker } from './api/server'

import './primitiveui.css'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { fetchUsers } from './features/users/usersSlice'

// Wrap app rendering so we can wait for the mock API to initialize
// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  const root = createRoot(document.getElementById('root')!)

  store.dispatch(fetchUsers())

  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

start()
