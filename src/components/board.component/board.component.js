import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import ColumnList from '../column-list.component/column-list.component'
import Nav from '../nav.component/nav.component'
import './board.component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import CardDetail from '../card-detail.component/card-detail.component'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showListForm: false,
      showWindow: false,
      cardWindow: undefined,
      listWindowId: undefined
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
    const name = document.getElementById('list-title-input').value
    if (name !== '') {
      this.props.addList(name, this.props.username)
      this.setState({ showListForm: false })
    }
  }

  showCardDetailsWindow = (listId, card) => {
    this.setState({ showWindow: true, cardWindow: card, listWindowId: listId })
  }

  hideCardDetailsWindow = () => {
    this.setState({ showWindow: false })
  }

  render() {
    const index = this.props.columnList.findIndex(board => board.user === this.props.username)
    const board = this.props.columnList[index]
    let columns = board.list.map(list =>
      <ColumnList
        key={uuid()}
        list={list}
        showCardDetailsWindow={this.showCardDetailsWindow} />)
    return (
      <div key={uuid()}>
        <Nav></Nav>
        <div className='board'>
          {columns}
          <div className='add-list-container'>
            {!this.state.showListForm && <button onClick={this.showListForm}>
              <FontAwesomeIcon icon={faPlus} />
              Add another list</button>}
            {this.state.showListForm &&
              <React.Fragment>
                <input id='list-title-input' placeholder='Enter list title...'></input>
                <div className='add-list-container__options'>
                  <button onClick={this.addList}>Add</button>
                  <button onClick={this.showListForm}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
              </React.Fragment>}
          </div>
          {this.state.showWindow &&
            <div className='window-overlay'>
              <CardDetail
                card={this.state.cardWindow}
                hideCardDetailsWindow={this.hideCardDetailsWindow}
                editCard={this.props.editCard}
                listId={this.state.listWindowId} 
                boardList={columns}/>
            </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  columnList: state.board.columnList,
  username: state.login.username
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    addList: (name, username) => {
      dispatch({ type: 'ADD_LIST', name, username});
    },

    editCard: (card, listId) => {
      dispatch({ type: 'EDIT_CARD', card, listId });
    },

    viewDetails: (id) => {
      dispatch({ type: 'VIEW_DETAILS', id });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)