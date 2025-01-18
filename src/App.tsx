import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { LoginPage } from './features/auth/LoginPage'
import { PostsMainPage } from './features/posts/PostsMainPage'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'

import { selectCurrentUsername } from './features/auth/authSlice'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { logout } from './features/auth/authSlice'
import { Layout } from './components/Layout'
import { Navbar } from './components/Navbar'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      console.log('unmounting')
      dispatch(logout())
    }
  }, [dispatch])

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/posts" element={<PostsMainPage />} />
                    <Route path="/posts/:postId" element={<SinglePostPage />} />
                    <Route path="/editPost/:postId" element={<EditPostForm />} />
                    <Route path="/users" element={<UsersList />} />
                    <Route path="/users/:userId" element={<UserPage />} />
                    <Route path="/notifications" element={<NotificationsList />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
