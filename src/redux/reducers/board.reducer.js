import uuid from 'uuid'
import { ADD_CARD, DELETE_CARD, EDIT_CARD, ADD_LIST, EDIT_LIST_NAME, DELETE_LIST, ADD_USER_BOARD } from '../actions/board.actions'

const initialState = {
  columnList: [{
    user: '', list: [{
      id: uuid(),
      name: 'To Do', cards: [{ id: uuid(), name: 'Task 1', details: 'hola' },
      { key: uuid(), name: 'Task 2', details: 'hola' }]
    }]
  }]
}

export default function (state = initialState, action) {
  let newColumnList
  let index
  let list
  let cardIndex
  let listIndex
  switch (action.type) {
    case ADD_CARD:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.user === action.username)
      listIndex = newColumnList[index].list.findIndex(x => x.id === action.listId)
      newColumnList[index].list[listIndex].cards.push(action.card)
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case EDIT_CARD:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.user === action.username)
      listIndex = newColumnList[index].list.findIndex(x => x.id === action.listId)
      cardIndex = newColumnList[index].list[listIndex].cards.findIndex(x => x.id === action.card.id)
      newColumnList[index].list[listIndex].cards[cardIndex] = action.card
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case DELETE_CARD:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.user === action.username)
      listIndex = newColumnList[index].list.findIndex(x => x.id === action.listId)
      cardIndex = newColumnList[index].list[listIndex].cards.findIndex(x => x.id === action.cardId)
      newColumnList[index].list[listIndex].cards.splice(cardIndex, 1)
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case ADD_LIST:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.user === action.username)
      list = {
        name: action.name,
        id: uuid(),
        cards: []
      }
      newColumnList[index].list.push(list)
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case EDIT_LIST_NAME:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.user === action.username)
      listIndex = newColumnList[index].list.findIndex(x => x.id === action.listId)
      newColumnList[index].list[listIndex].name = action.listName
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });

    case DELETE_LIST:
      return Object.assign(
        {},
        state, {

        });
    case ADD_USER_BOARD:
      newColumnList = [...state.columnList]
      newColumnList.push(action.board)
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    default:
      return state
  }
}
