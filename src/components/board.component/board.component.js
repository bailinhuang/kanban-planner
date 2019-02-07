import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import ColumnList from '../column-list.component/column-list.component'
import Nav from '../nav.component/nav.component'
import './board.component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { CardDetail } from '../card-detail.component/card-detail.component'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showListForm: false,
      showWindow: false,
      cardWindow: undefined
    }
  }

  showListForm = () => {
    if (!this.state.showListForm) {
      this.setState({ showListForm: true })
    } else {
      this.setState({ showListForm: false })
    }
  }

  addList = () => {
    let name = document.getElementById("list-title-input").value
    this.props.addList(name)
    this.setState({ showListForm: false })
  }

  showCardDetailsWindow = (listName, card) => {
    this.setState({ showWindow: true, cardWindow: card })
  }

  hideCardDetailsWindow = () => {
    this.setState({ showWindow: false })
  }

  render() {
    let columns = this.props.columnList.map(list =>
      <ColumnList
        key={uuid()}
        name={list.name}
        cards={list.cards}
        showCardDetailsWindow={this.showCardDetailsWindow} />)
    return (
      <div key={uuid()}>
        <Nav></Nav>
        <div className="board">
          {columns}
          <div className="add-list-container">
            {!this.state.showListForm && <button onClick={this.showListForm}>
              <FontAwesomeIcon icon={faPlus} />
              Add another list</button>}
            {this.state.showListForm &&
              <React.Fragment>
                <input id="list-title-input" placeholder="Enter list title..."></input>
                <div className="add-list-container__options">
                  <button onClick={this.addList}>Add</button>
                  <button onClick={this.showListForm}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
              </React.Fragment>
            }
          </div>
          {
            this.state.showWindow &&
            <div className="window-overlay">
              <CardDetail
                card={this.state.cardWindow}
                hideCardDetailsWindow={this.hideCardDetailsWindow} />
            </div>
          }
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
    addList: (name) => {
      dispatch({ type: 'ADD_LIST', name });
    },

    viewDetails: (id) => {
      dispatch({ type: 'VIEW_DETAILS', id });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)