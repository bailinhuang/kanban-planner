import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'

import './column-list.component.scss'
import Card from '../card.component/card.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class ColumnList extends Component {

  constructor() {
    super()
    this.state = {
      showComposer: false
    }
  }

  showComposer = () => {
    if (!this.state.showComposer) {
      this.setState({ showComposer: true })
    } else {
      this.setState({ showComposer: false })
    }
  }

  addNewCard = () => {
    const title = document.getElementById('add-card-title').value
    const details = document.getElementById('add-card-details').value
    const card = {
      id: uuid(),
      name: title,
      details: details
    }
    this.props.addCard(card, this.props.name)
    this.setState({ showComposer: false })
  }

  render() {
    let cards
    if (this.props.cards !== undefined) {
      cards = this.props.cards.map(card =>
        <Card
          key={uuid()}
          card={card}
          listName={this.props.name}
          showCardDetailsWindow={this.props.showCardDetailsWindow} />)
    }

    return (
      <div key={uuid()} className="list-wrapper">
        <div className="list-content">
          <div className="list-header">
            <h3 className="list-title">{this.props.name}</h3>
            <div className="list-header__settings">
              <span>

              </span>
            </div>
          </div>
          <div className="list-cards">
            {cards}
          </div>
          {!this.state.showComposer &&
            <button onClick={this.showComposer}>
              <FontAwesomeIcon className="icon--unstyled" icon={faPlus} /> Add another card
            </button>}
          {this.state.showComposer && <div className="card-composer">
            <textarea id="add-card-title" placeholder="Enter card's title"></textarea>
            <textarea id="add-card-details" placeholder="Enter card's details"></textarea>
            <button onClick={this.addNewCard}>Add</button>
          </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  columnList: state.board.columnList
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addCard: (card, listName) => {
      dispatch({ type: 'ADD_CARD', card, listName });
    },

    deleteCard: (id) => {
      dispatch({ type: 'DELETE_CARD', id });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnList)