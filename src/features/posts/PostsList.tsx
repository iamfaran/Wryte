import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { Link } from 'react-router-dom'
import { selectAllPosts, fetchPosts, selectPostsStatus } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'
export const PostsList = () => {
  const dispatch = useAppDispatch()
  // Select the `state.posts` value from the store into the component
  const posts = useAppSelector(selectAllPosts)

  // select the post status
  const postStatus = useAppSelector(selectPostsStatus)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus == 'pending') {
    content = <CircularProgress sx={{ display: 'block', margin: '0 auto' }} size="3rem" />
  } else if (postStatus == 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <article className="post-excerpt" key={post.id}>
        <h3>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
      </article>
    ))
  } else if (postStatus == 'failed') {
    content = <h1>Error</h1>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
