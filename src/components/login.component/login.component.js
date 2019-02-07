import React, { Component } from 'react'
import './login.component.scss'

class Login extends Component {
  render() {
    return (
      <div className="login-content">
        <div className="login-form">
          <h1>KanBai Board</h1>
          <p className="big-font">Username</p>
          <input id="username-input" placeholder="e.g. DaRockstar"></input>
          <p className="big-font">Password</p>
          <input id="username-input" placeholder="e.g. ********"></input>
        </div>
        <div>
          <button className="button-med">Login</button>
        </div>
      </div>
    )
  }
}

export default Login