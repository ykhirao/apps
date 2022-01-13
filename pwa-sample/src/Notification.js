import React, { Component } from 'react'
import { Typography } from '@material-ui/core'

class NotificationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { notification: null, connection: null }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.notifyMe()
    var connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection
    console.log(connection)
    this.setState({
      connection
    })
  }

  notifyMe() {
    // 許可を得ていない場合は、ユーザに許可を求めなければならない

    // ブラウザが通知をサポートしているか確認する
    if (!('Notification' in window)) {
      return
    } else if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-unused-vars
      var notification = new Notification('Hi there!')
    } else if (Notification.permission !== 'denied') {
      console.log(Notification)
      Notification.requestPermission(function(permission) {
        // ユーザが許可した場合は、通知を作成する
        if (permission === 'granted') {
          // eslint-disable-next-line no-unused-vars
          var notification = new Notification('Hi there!')
        }
      })
    }
  }

  handleClick(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        <Typography style={{ marginBottom: 50 }} variant="h1">
          test
        </Typography>
        <button onClick={this.handleClick}>click me</button>
        {this.state.connection && (
          <div>
            <div>effectiveType {this.state.connection.effectiveType}</div>
            <div>type {this.state.connection.type}</div>
            <div>onchange {this.state.connection.onchange}</div>
            <div>rtt {this.state.connection.rtt}</div>
            <div>downlink {this.state.connection.downlink}</div>
            <div>saveData {this.state.connection.saveData}</div>
          </div>
        )}
      </>
    )
  }
}

export default NotificationComponent
