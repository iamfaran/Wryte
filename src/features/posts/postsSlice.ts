import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export interface Post {
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
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content },
        }
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload
      console.log(state)
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer

// selector for all posts
// because in case our state changes we just need to change
// the selector

export const selectAllPosts = (state: RootState) => state.posts

// selector for specific post
export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)
