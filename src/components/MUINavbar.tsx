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

export const MUINavbar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount)

  const isLoggedIn = !!user

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogoutClicked = () => {
    dispatch(logout())
  }

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Redux Essentials Example
        </Typography>
        {isLoggedIn ? (
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
        ) : null}
      </Toolbar>
    </AppBar>
  )
}
