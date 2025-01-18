import { Link } from 'react-router-dom'
import { Container, Typography, Grid, Card, CardContent, Avatar, Box, ButtonBase, Divider } from '@mui/material'
import { PersonOutline } from '@mui/icons-material'

import { useAppSelector } from '@/app/hooks'
import { selectAllUsers } from './usersSlice'

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers)

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Users
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <ButtonBase
                component={Link}
                to={`/users/${user.id}`}
                sx={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  textDecoration: 'none',
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[4],
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 56,
                          height: 56,
                        }}
                      >
                        <PersonOutline />
                      </Avatar>
                      <Typography variant="h6" component="h2" color="text.primary">
                        {user.name}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
