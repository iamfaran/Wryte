import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Button, Grid, CircularProgress, Container, Avatar } from '@mui/material'
import { PersonOutline } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectAllUsers, fetchUsers } from '@/features/users/usersSlice'
import { login } from './authSlice'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()

  const handleLogin = async (userId: string) => {
    await dispatch(login(userId))
    navigate('/posts')
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Welcome to Wryte!
        </Typography>
        <Typography variant="h6" component="h2" textAlign="center" color="text.secondary" mb={4}>
          Choose your account to log in
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      margin: '0 auto 16px',
                      bgcolor: 'primary.main',
                    }}
                  >
                    <PersonOutline sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography gutterBottom variant="h6" component="div">
                    {user.name}
                  </Typography>
                  <Button variant="contained" fullWidth onClick={() => handleLogin(user.id)} sx={{ mt: 2 }}>
                    Log In
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
