import React from 'react'
import 'typeface-roboto'
import { Container } from '@material-ui/core'
import Notification from './Notification'

function App(props) {
  return (
    <Container maxWidth="sm" style={{ padding: 0 }}>
      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center'
        }}
      >
        <Notification />
      </Container>
    </Container>
  )
}

export default App
