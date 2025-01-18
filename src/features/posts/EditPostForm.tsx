import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Typography, Box, Card, CardContent, TextField, Button, Paper, Stack } from '@mui/material'
import { Save as SaveIcon } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { postUpdated, selectPostById } from './postsSlice'

interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}

export const EditPostForm = () => {
  const { postId } = useParams()
  const post = useAppSelector((state) => selectPostById(state, postId!))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!post) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h5" color="error" textAlign="center">
                Post not found!
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    )
  }

  const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Edit Post
            </Typography>

            <Box component="form" onSubmit={onSavePostClicked} noValidate autoComplete="off">
              <Stack spacing={3}>
                <TextField
                  id="postTitle"
                  name="postTitle"
                  label="Post Title"
                  defaultValue={post.title}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                <TextField
                  id="postContent"
                  name="postContent"
                  label="Content"
                  defaultValue={post.content}
                  required
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                />

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    sx={{
                      px: 4,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Save Post
                  </Button>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
