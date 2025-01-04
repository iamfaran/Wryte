import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectCurrentUser } from '@/features/users/usersSlice'
import { logout } from '@/features/auth/authSlice'
import { fetchNotifications, selectUnreadNotificationsCount } from '@/features/notifications/notificationsSlice'
import { UserIcon } from './UserIcon'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Drawer } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useParams } from 'react-router-dom'

export const MUINavbar = () => {
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Wryte
        </Typography>
        {isLoggedIn ? (
          smallScreen ? (
            <>
              <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
                <Box sx={{ padding: 2, textAlign: 'center', fontWeight: 'bold' }}>{user.name}</Box>
                <Divider />
                <Button color="inherit" component={Link} to="/posts">
                  Posts
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  Users
                </Button>
                <Button color="inherit" component={Link} to="/notifications">
                  <Badge badgeContent={numUnreadNotifications} color="error">
                    Notifications
                  </Badge>
                </Button>
                <Button color="inherit" onClick={fetchNewNotifications}>
                  Refresh Notifications
                </Button>
              </Drawer>

              <IconButton size="large" edge="end" color="inherit" onClick={() => setDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/posts">
                Posts
              </Button>
              <Button color="inherit" component={Link} to="/users">
                Users
              </Button>
              <Button color="inherit" component={Link} to="/notifications">
                <Badge badgeContent={numUnreadNotifications} color="error">
                  Notifications
                </Badge>
              </Button>
              <Button color="inherit" onClick={fetchNewNotifications}>
                Refresh Notifications
              </Button>
              <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
                <UserIcon size={32} />
              </IconButton>
              {/* Menu takes 3 props  
              anchorEL - the element that the menu is attached to
              open - whether the menu is open or not
              onClose - what to do when the menu is closed
            */}
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem disabled>{user.name}</MenuItem>
                <MenuItem onClick={onLogoutClicked}>Log Out</MenuItem>
              </Menu>
            </>
          )
        ) : null}
      </Toolbar>
    </AppBar>
  )
}
