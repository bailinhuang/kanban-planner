import React, { Component } from 'react'
import { connect } from 'react-redux'
import './card-detail.component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";
import { debug } from 'util';

class CardDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      editableDescription: false,
      editableName: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  showEditableDescription = () => {
    this.setState({ editableDescription: true })
  }

  showEditableName = () => {
    this.setState({ editableName: true })
  }

  saveEdits = () => { 
    const name = document.getElementById('card-name-input').value
    const details = document.getElementById('card-details-textarea').value
    const dueDate = this.state.startDate
    const listId = this.props.listId
    let card = {
      id: this.props.card.id,
      name: name,
      details: details,
      dueDate: dueDate
    }
    this.props.editCard(card, listId)
    this.props.hideCardDetailsWindow()
  } 

  deleteCard = () =>{
    this.props.deleteCard(this.props.card.id, this.props.listId)
    this.props.hideCardDetailsWindow()
  }
  render() {
    const {listName, name, details } = this.props.card
    return (
      <div className="card-detail-window--wrapper">
        <div className="card-detail-window">
          <div className="card-detail-window__header">
            <div className="card-detail-window__title">
              {!this.state.editableName &&
                <h3 onClick={this.showEditableName}>{name}</h3>}
              {this.state.editableName && <input defaultValue={name} id="card-name-input"></input>}
              <p>in list: {listName}</p>
            </div>
            <button onClick={() => this.props.hideCardDetailsWindow()}><FontAwesomeIcon icon={faTimes} /></button>
          </div>
          <div className="card-detail-window__content">
            <h4>Description</h4>
            {!this.state.editableDescription &&
              <p onClick={this.showEditableDescription}>{details}</p>}
            {this.state.editableDescription && <textarea defaultValue={details} id="card-details-textarea"></textarea>}
            <h4>Due Date</h4>
            <DatePicker selected={this.state.startDate} onChange={this.handleChange} id="card-due-date" />
            <div className="card-detail--controls">
              <button className="save-button button-primary" onClick={this.saveEdits}>Save</button>
              <button className="save-button button-danger" onClick={this.deleteCard}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  columnList: state.board.columnList
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    editCard: (card, listId) => {
      dispatch({ type: 'EDIT_CARD', card, listId });
    },
    
    deleteCard: (cardId, listId) => {
      dispatch({ type: 'DELETE_CARD', cardId, listId });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail)