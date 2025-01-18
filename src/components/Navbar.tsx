import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
  MenuItem,
  Menu,
  Drawer,
  Box,
  Divider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { logout } from '@/features/auth/authSlice'
import { fetchNotifications, selectUnreadNotificationsCount } from '@/features/notifications/notificationsSlice'
import { UserIcon } from './UserIcon'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Layout } from './Layout'

// Import icons
import MenuIcon from '@mui/icons-material/Menu'
import ArticleIcon from '@mui/icons-material/Article'
import PeopleIcon from '@mui/icons-material/People'
import NotificationsIcon from '@mui/icons-material/Notifications'
import RefreshIcon from '@mui/icons-material/Refresh'
import LogoutIcon from '@mui/icons-material/Logout'

export const Navbar = () => {
  const smallScreen = useMediaQuery('(max-width: 768px)')
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount)
  const isLoggedIn = !!user
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawer, setDrawer] = useState<boolean>(false)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogoutClicked = () => {
    setAnchorEl(null)
    dispatch(logout())
  }

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  const NavButtons = () => (
    <>
      <Button color="inherit" component={Link} to="/posts" startIcon={<ArticleIcon />}>
        Posts
      </Button>
      <Button color="inherit" component={Link} to="/users" startIcon={<PeopleIcon />}>
        Users
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/notifications"
        startIcon={
          <Badge badgeContent={numUnreadNotifications} color="error">
            <NotificationsIcon />
          </Badge>
        }
      >
        Notifications
      </Button>
      <IconButton color="inherit" onClick={fetchNewNotifications} size="small">
        <RefreshIcon />
      </IconButton>
    </>
  )

  return (
    <AppBar position="sticky">
      <Layout>
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Wryte
          </Typography>
          {isLoggedIn ? (
            smallScreen ? (
              <>
                <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
                  <Box sx={{ p: 2, fontWeight: 'bold' }}>{user.name}</Box>
                  <Divider />
                  <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <NavButtons />
                  </Box>
                </Drawer>

                <IconButton size="large" edge="end" color="inherit" onClick={() => setDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <>
                <NavButtons />
                <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
                  <UserIcon size={32} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem disabled>{user.name}</MenuItem>
                  <MenuItem onClick={onLogoutClicked}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Log Out
                  </MenuItem>
                </Menu>
              </>
            )
          ) : null}
        </Toolbar>
      </Layout>
    </AppBar>
  )
}
