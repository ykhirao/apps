import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
// import { PauseOutlined, PlayArrowOutlined } from '@material-ui/icons'

class Expo extends Component {
  constructor(props) {
    super(props)
    this.state = { powerOn: false, speed: 0 }
  }

  componentWillUnmount() {
    this.setState({
      powerOn: false
    })
  }

  getNetwork = () => {
    const connectionInfo = navigator.connection

    this.setState({
      powerOn: true,
      speed: connectionInfo.downlink
    })

    const changeFunc = e =>
      this.state.powerOn && this.setState({ speed: e.target.downlink })

    navigator.connection.onchange = changeFunc
  }

  render() {
    return (
      <>
        <Typography style={{ marginBottom: 50 }} variant="h1">
          {this.state.speed}Mbps
        </Typography>
      </>
    )
  }
}

export default Expo
