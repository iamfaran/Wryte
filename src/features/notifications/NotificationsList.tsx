import { useLayoutEffect } from 'react'
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, Avatar, Divider, Chip } from '@mui/material'
import { Notifications as NotificationsIcon } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { selectAllNotifications, allNotificationsRead } from './notificationsSlice'

export const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  return (
    <Container maxWidth="md">
      <Box py={4}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <NotificationsIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h1">
            Notifications
          </Typography>
        </Box>

        {/* Notifications List */}
        <Paper variant="outlined">
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.isNew ? 'action.hover' : 'transparent',
                    transition: 'background-color 0.3s',
                    py: 2,
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      {/* Author Avatar */}
                      <Avatar
                        sx={{
                          bgcolor: notification.isNew ? 'primary.main' : 'grey.400',
                          width: 40,
                          height: 40,
                        }}
                      >
                        <PostAuthor userId={notification.user} showPrefix={false} />
                      </Avatar>

                      {/* Message and Status */}
                      <Box flex={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="subtitle1" component="span">
                            <Box component="span" fontWeight="bold">
                              <PostAuthor userId={notification.user} showPrefix={false} />
                            </Box>{' '}
                            {notification.message}
                          </Typography>
                          {notification.isNew && <Chip label="New" color="primary" size="small" sx={{ height: 20 }} />}
                        </Box>
                      </Box>
                    </Box>

                    {/* Timestamp */}
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
                      <TimeAgo timestamp={notification.date} />
                    </Typography>
                  </Box>
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}

            {notifications.length === 0 && (
              <ListItem>
                <ListItemText
                  primary={
                    <Typography color="text.secondary" textAlign="center">
                      No notifications
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </Box>
    </Container>
  )
}
