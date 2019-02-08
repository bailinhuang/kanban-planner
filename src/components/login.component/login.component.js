import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ApiCalendar from 'react-google-calendar-api'
import './login.component.scss'
import googleLogo from '../../assets/icons/brands/google-logo.svg' 



class Login extends Component {

  constructor() {
    super()
    this.state = {
      sign: ApiCalendar.sign,
      username: '',
      password: ''
    }
  }
  
  register = (username) => { 
    let board = {
      user: username, list: []
    }
    const index = this.props.users.includes(username)  
    if (!index) {
      this.props.addUserBoard(board)
    }
  }

  signUpdate = () => {
    const username = window['gapi'].auth2.getAuthInstance().currentUser.Ab.w3.U3
    this.register(username)
    this.props.login(username, true)
    this.props.history.push('/board')
  }

  signIn = () => {
    this.register(this.state.username)
    this.props.login(this.state.username, false)
    this.props.history.push('/board')
  }

  googleSignIn = () => {
    ApiCalendar.handleAuthClick()
    ApiCalendar.listenSign(this.signUpdate)
  }

  setUsername = (e) => {
    this.setState({
      username: e
    })
  }

  setPassword = (e) => {
    this.setState({
      password: e
    })
  }

  render() { 

    return (
      <div className='login-content'>
        <div className='login-form'>
          <h1>KanBai Board</h1>
          <p className='big-font'>Username</p>
          <input className='login-input' type='text' placeholder='e.g. Rockstar' onChange={(e) => this.setUsername(e.target.value)}></input>
          <p className='big-font'>Password</p>
          <input className='login-input' type='password' placeholder='e.g. ********' onChange={(e) => this.setPassword(e.target.value)}></input>
        </div>
        <div className='login-button-controls'>
          <button className='button-med button-primary' onClick={this.signIn}>Login</button>
          <button className='button-med button-grey' onClick={this.googleSignIn}>
            <span> <img src={googleLogo} alt='google logo'></img> </span> Log in with Google
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.login.users
})


const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (username, googleLogin) => {
      dispatch({ type: 'LOGIN', username, googleLogin });
    },

    addUserBoard: (board) => {
      dispatch({ type: 'ADD_USER_BOARD', board });
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))