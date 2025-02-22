import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { addNewPost } from './postsSlice'
import { de } from '@faker-js/faker'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import { TextField } from '@mui/material'
import Stack from '@mui/material/Stack'
// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

type addRequestStatusType = 'idle' | 'pending'

export const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState<addRequestStatusType>('idle')
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectCurrentUsername)!

  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const form = e.currentTarget

    try {
      setAddRequestStatus('pending')

      // The `unwrap()` method is used here to handle the case where the thunk
      // is rejected.  The `unwrap()` method will throw an error when the thunk
      // is rejected, which is then caught by the `catch` block below.
      //await dispatch(addNewPost({ title, content, user: userId })).unwrap()
      // IMPORTANT below
      // * if we don't pass thunk in dispatch then it run synchronously and won't return a promise
      // * if we pass thunk in dispatch then it run asynchronously and will return a promise
      // * and we can use `.unwrap()` method to handle the case where the thunk is rejected

      await dispatch(addNewPost({ title, content, user: userId })).unwrap()

      form.reset()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required /> */}

        {/* <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required /> */}

        <Stack spacing={2}>
          <TextField id="postTitle" name="postTitle" label="Post Title" variant="outlined" required />
          <TextField
            id="postContent"
            name="postContent"
            label="Content"
            multiline
            rows={3}
            variant="outlined"
            required
          />
          {addRequestStatus == 'pending' ? (
            <LinearProgress />
          ) : (
            <Button sx={{ alignSelf: 'flex-start' }} size="large" variant="contained" type="submit">
              Save Post
            </Button>
          )}
        </Stack>

        {/* <Button variant="contained" type="submit" disabled={addRequestStatus === 'pending'}>
          {addRequestStatus === 'pending' ? 'Saving...' : 'Save Post'}
        </Button> */}
      </form>
    </section>
  )
}
