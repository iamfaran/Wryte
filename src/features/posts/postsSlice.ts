import { createSlice } from '@reduxjs/toolkit'

interface Post {
  id: string
  title: string
  content: string
}

const initialState: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the first post',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the second post',
  },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
})

export default postsSlice.reducer
