import React, { Component } from 'react'
import { connect } from 'react-redux'
import './card-detail.component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Calendar from 'react-calendar';

export class CardDetail extends Component {

  constructor() {
    super()
    this.state = {
      editableDescription: false
    }
  }

  showEditableDescription = () => {
    this.setState({ editableDescription: true })
  }

  render() {
    const { listName, name, details } = this.props.card
    return (
      <div className="card-detail-window--wrapper">
        <div className="card-detail-window">
          <div className="card-detail-window__header">
            <div className="card-detail-window__title">
              <h3 contentEditable="true">
                {name}
              </h3>
              <p>in list: {listName}</p>
            </div>
            <button onClick={() => this.props.hideCardDetailsWindow()}><FontAwesomeIcon icon={faTimes} /></button>
          </div>
          <div className="card-detail-window__content">
            <h4>Description</h4>
            {!this.state.editableDescription &&
              <p onClick={this.showEditableDescription}>{details}</p>}
            {this.state.editableDescription && <textarea defaultValue={details}></textarea>}
            <h4>Due Date</h4>
            <Calendar />
            <div className="card-detail--controls">
              <button className="save-button button-primary">Save</button>
              <button className="save-button button-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  columnList: state.board.columnList
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail)
