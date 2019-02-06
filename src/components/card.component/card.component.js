import React, { Component } from 'react'
import './card.component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class Card extends Component {

  constructor() {
    super()
    this.state = {
      showDetails: false
    }
  }

  showDetails = () => {
    if (!this.state.showDetails) {
      this.setState({ showDetails: true })
    } else {
      this.setState({ showDetails: false })
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <button className="card-title" onClick={() => this.showDetails()}>{this.props.name}</button>
          <button><FontAwesomeIcon icon={faEdit} /></button>
        </div>
        {this.state.showDetails && <div className="card-details-container">
          <p className="card-details">{this.props.details}</p>
        </div>}
      </div>
    )
  }
}

export default Card