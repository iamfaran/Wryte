import { Link, useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material'
import { PersonOutline, Article as ArticleIcon } from '@mui/icons-material'

import { useAppSelector } from '@/app/hooks'
import { selectPostsByUser } from '@/features/posts/postsSlice'
import { selectUserById } from './usersSlice'

export const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector((state) => selectUserById(state, userId!))
  const postsForUser = useAppSelector((state) => selectPostsByUser(state, userId!))

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Card>
            <CardContent>
              <Typography variant="h5" color="error" textAlign="center">
                User not found!
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        {/* User Profile Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: 'primary.main',
                }}
              >
                <PersonOutline sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {postsForUser.length} Posts
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <Paper variant="outlined">
          <Box p={2} bgcolor="background.default">
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ArticleIcon color="primary" />
              Posts by {user.name}
            </Typography>
          </Box>
          <Divider />
          <List>
            {postsForUser.map((post, index) => (
              <Box key={post.id}>
                <ListItem
                  component={Link}
                  to={`/posts/${post.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <ListItemText
                    primary={post.title}
                    primaryTypographyProps={{
                      color: 'primary.main',
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
                {index < postsForUser.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>

        {postsForUser.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography color="text.secondary">No posts found for this user.</Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}
