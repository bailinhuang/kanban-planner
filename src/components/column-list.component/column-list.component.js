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
    if (title !== '') {
      const card = {
        id: uuid(),
        name: title,
        details: details,
        dueDate: 'none'
      }
      this.props.addCard(card, this.props.list.id, this.props.username)
      this.setState({ showComposer: false })
    }
  }


  render() {
    const {cards, id, name} = this.props.list
    let cardList
    if (cards !== undefined) {
      cardList = cards.map(card =>
        <Card
          key={uuid()}
          card={card}
          listName={name}
          listId={id}
          showCardDetailsWindow={this.props.showCardDetailsWindow} />)
    }

    return (
      <div key={uuid()} className='list-wrapper'>
        <div className='list-content'>
          <div className='list-header'>
            <input className='list-title' defaultValue={name}
              contentEditable='true' onBlur={(e) => this.props.editListName(id, e.target.value, this.props.username)}>
            </input>
          </div>
          <div className='list-cards'>
            {cardList}
          </div>
          {!this.state.showComposer &&
            <button onClick={this.showComposer}>
              <FontAwesomeIcon className='icon--unstyled' icon={faPlus} /> Add another card
            </button>}
          {this.state.showComposer && <div className='card-composer'>
            <textarea id='add-card-title' placeholder="Enter card's title"></textarea>
            <textarea id='add-card-details' placeholder="Enter card's details"></textarea>
            <button onClick={this.addNewCard}>Add</button>
          </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  columnList: state.board.columnList,
  username: state.login.username
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card, listId, username) => {
      dispatch({ type: 'ADD_CARD', card, listId, username });
    },

    deleteCard: (id, listId, username) => {
      dispatch({ type: 'DELETE_CARD', id, listId, username });
    },

    editListName: (listId, listName, username) => {
      dispatch({ type: 'EDIT_LIST_NAME', listId, listName, username })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnList)