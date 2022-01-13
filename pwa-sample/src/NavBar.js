import React from 'react'
import { Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'
import PauseOutlined from '@material-ui/icons/PauseOutlined'

export default function NavBar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <PauseOutlined />
        </IconButton>
        <Typography variant="h6">News</Typography>
      </Toolbar>
    </AppBar>
  )
}
