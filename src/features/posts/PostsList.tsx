import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { Link } from 'react-router-dom'
import { selectAllPosts, fetchPosts, selectPostsStatus } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { useEffect } from 'react'
import { CircularProgress, Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material'

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postStatus = useAppSelector(selectPostsStatus)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <CircularProgress sx={{ display: 'block', margin: '0 auto' }} size="3rem" />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    content = (
      <Grid container spacing={3}>
        {orderedPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content.substring(0, 100)}...
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary" mt={1}>
                  <PostAuthor userId={post.user} /> • <TimeAgo timestamp={post.date} />
                </Typography>
              </CardContent>
              <CardActions>
                <ReactionButtons post={post} />
                <Button size="small" component={Link} to={`/posts/${post.id}`}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  } else if (postStatus === 'failed') {
    content = <h1>Error</h1>
  }

  return (
    <section className="posts-list">
      <Typography sx={{ my: 2 }} variant="h4" component="h2" gutterBottom>
        Posts
      </Typography>
      {content}
    </section>
  )
}
