import React, { Component } from 'react'
import { connect } from 'react-redux'
import './card-detail.component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ApiCalendar from 'react-google-calendar-api'
import dayjs from 'dayjs'

class CardDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      editableDescription: false,
      editableName: false,
      saveToCalendar: false
    };
    this.handleChange = this.handleChange.bind(this)
    ApiCalendar.setCalendar('primary')
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
    let name = this.props.card.name
    if (this.state.editableName) {
      name = document.getElementById('card-name-input').value
    }
    let details = this.props.card.details
    if (this.state.editableDescription) {
      details = document.getElementById('card-details-textarea').value
    }
    const dueDate = this.state.startDate
    const listId = this.props.listId
    let card = {
      id: this.props.card.id,
      name: name,
      details: details,
      dueDate: dueDate
    }
    this.props.editCard(card, listId, this.props.username)
    this.props.hideCardDetailsWindow()
    if (this.state.saveToCalendar) {
      this.postGoogleCalendar(card)
    }
  }

  deleteCard = () => {
    this.props.deleteCard(this.props.card.id, this.props.listId, this.props.username)
    this.props.hideCardDetailsWindow()
  }

  postGoogleCalendar = (card) => {
    const { dueDate, name, details } = card
    const startDate = dayjs(dueDate)
    const event = {
      summary: name,
      description: details,
      start: {
        dateTime: startDate.format('YYYY-MM-DDTHH:mm:ss-06:00'),
        timeZone: 'America/Costa_Rica'
      },
      end: {
        dateTime: startDate.add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss-06:00'),
        timeZone: 'America/Costa_Rica'
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', 'minutes': 10 }
        ]
      }
    };
    ApiCalendar.createEvent(event)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  saveToCalendar = () => {
    this.setState({ saveToCalendar: true })
  }

  render() {
    const { listName, name, details } = this.props.card
    return (
      <div className='card-detail-window--wrapper'>
        <div className='card-detail-window'>
          <div className='card-detail-window__header'>
            <div className='card-detail-window__title'>
              {!this.state.editableName &&
                <h3 onClick={this.showEditableName}>{name}</h3>}
              {this.state.editableName && <input defaultValue={name} id='card-name-input'></input>}
              <p>in list: {listName}</p>
            </div>
            <button onClick={() => this.props.hideCardDetailsWindow()}><FontAwesomeIcon icon={faTimes} /></button>
          </div>
          <div className='card-detail-window__content'>
            <h4>Description</h4>
            {!this.state.editableDescription &&
              <p onClick={this.showEditableDescription}>{details}</p>}
            {this.state.editableDescription && <textarea defaultValue={details} id='card-details-textarea'></textarea>}
            <h4>Due Date</h4>
            <DatePicker selected={this.state.startDate} onChange={this.handleChange} showTimeSelect id='card-due-date' />
            <div className='card-detail--controls'>
              <div>
                <button className='save-button button-primary' onClick={this.saveEdits}>Save</button>
                <input type='checkbox' id='google-calendar-checkbox' onClick={this.saveToCalendar}></input>
                <label>Save to Calendar</label>
              </div>
              <button className='save-button button-danger justify-left' onClick={this.deleteCard}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  columnList: state.board.columnList,
  username: state.login.username
});

const mapDispatchToProps = (dispatch) => {
  return {
    editCard: (card, listId, username) => {
      dispatch({ type: 'EDIT_CARD', card, listId, username});
    },

    deleteCard: (cardId, listId, username) => {
      dispatch({ type: 'DELETE_CARD', cardId, listId, username });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail)