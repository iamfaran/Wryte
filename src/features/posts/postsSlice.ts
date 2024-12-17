import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { sub } from 'date-fns'
import { userLoggedOut } from '../auth/authSlice'
import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/app/withTypes'

// create async thunk for fetching posts

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())
      // meaning request is already in progress

      if (postsStatus !== 'idle') {
        return false
      }
    },
  },
)

// IMportant
// fetchPosts will have 3 states/properties
// fetchPosts.pending
// fetchPosts.fulfilled
// fetchPosts.rejected
// we will add these conditions in our extraReducers

// this is when we will edit a post
// this below syntax grab the properties from Post interface

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// this is the type of the state
export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

// ReactionName for payload of reaction
export type ReactionName = keyof Reactions

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

// create interface of PostsState
export interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: initialReactions,
          },
        }
      },
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      console.log(state)
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedOut, () => {
        return initialState
      })
      // in second arg state only belongs to this specific slice
      // in this case posts

      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        // here ?? means if error is null or undefined then set it to 'Unknown Error'

        state.error = action.error.message ?? 'Unknown Error'
      })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

// selector for all posts
// because in case our state changes we just need to change
// the selector

export const selectAllPosts = (state: RootState) => state.posts.posts

// selector for specific post
export const selectPostById = (state: RootState, postId: string) => state.posts.posts.find((post) => post.id === postId)

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
