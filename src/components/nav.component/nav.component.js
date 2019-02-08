import React, { Component } from 'react'
import './nav.component.scss'
import { Link } from 'react-router-dom'
import ApiCalendar from 'react-google-calendar-api'


class Nav extends Component {

  logout = () => {
    ApiCalendar.handleSignoutClick()
  }

  render() {
    return (
      <div className='nav'>
        <div className='logo'>
          <span>KanBai</span>
        </div>
        <ul className='nav-list'>
          <li>
            <Link to='/boards' onClick={this.logout}><span className='white-text'>Boards</span></Link>
          </li>
          <li>
            <Link to='/' onClick={this.logout}><span className='white-text'>Logout</span></Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav
