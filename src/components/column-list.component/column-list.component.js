import React, { Component } from 'react'
import { connect } from 'react-redux'

import './column-list.component.scss'
import Card from '../card.component/card.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class ColumnList extends Component {

  constructor(props) {
    super(props)
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
    let title = document.getElementById('add-card-title').value
    let details = document.getElementById('add-card-details').value
    this.props.addCard(title, details, this.props.name)
    this.setState({ showComposer: false })
  }

  render() {
    let cards
    if(this.props.cards !== undefined){
      cards = this.props.cards.map(card => <Card name={card.name} details={card.details} listName={this.props.name}/>)
    }
    return (
      <div className="list-wrapper">
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
          <button className="button--unstyled" onClick={() => this.showComposer()}>
            <FontAwesomeIcon className="icon--unstyled" icon={faPlus} /> Add another card
          </button>
          {this.state.showComposer && <div className="card-composer">
            <textarea id="add-card-title" placeholder="Enter card's title"></textarea>
            <textarea id="add-card-details" placeholder="Enter card's details"></textarea>
            <button onClick={() => this.addNewCard()}>Add</button>
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
    addCard: (name, details, listName) => {
      dispatch({ type: 'ADD_CARD', name, details, listName });
    },

    deleteCard: (id) => {
      dispatch({ type: 'DELETE_CARD', id });
    },

    viewDetails: (id) => {
      dispatch({ type: 'VIEW_DETAILS', id });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnList)