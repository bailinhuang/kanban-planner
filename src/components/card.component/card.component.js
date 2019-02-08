import React, { Component } from 'react'
import './card.component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import uuid from 'uuid'

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
    let { card } = this.props
    card.listName = this.props.listName
    const { name, details } = card
    return (
      <div key={uuid()} className='card'>
        <div className='card-header'> 
          <button className='card-title' onClick={this.showDetails}>{name}</button>
          <button onClick={() => this.props.showCardDetailsWindow(this.props.listId, this.props.card)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        {this.state.showDetails && <div className='card-details-container'>
          <p className='card-details'>{details}</p>
        </div>}
      </div>
    )
  }
}

export default Card