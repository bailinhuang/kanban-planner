import React, { Component } from 'react'
import './nav.component.scss'
import { Link } from "react-router-dom"


export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <ul>
          <li>
            <Link to='/'>Logout</Link>
          </li>
        </ul>
      </div>
    )
  }
}
