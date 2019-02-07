import uuid from 'uuid'

const initialState = {
  columnList: [{
    id: uuid(),
    name: 'To Do', cards: [{ id: uuid(), name: 'Task 1', details: 'hola' },
    { key: uuid(), name: 'Task 2', details: 'hola' }]
  }],

  board: [{
    name: "Board 1", columnList: [{
      name: 'patito', cards: [{ id: uuid(), name: 'hello', details: 'hola' },
      { id: uuid(), name: 'hello', details: 'hola' }]
    }]
  }]
}

const ADD_CARD = "ADD_CARD"
const DELETE_CARD = "DELETE_CARD"
const EDIT_CARD = "EDIT_CARD"
const ADD_LIST = "ADD_LIST"
const DELETE_LIST = "DELETE_LIST"
const ADD_BOARD = "ADD_BOARD"
const DELETE_BOARD = "DELETE_BOARD"

export default function (state = initialState, action) {
  let newColumnList
  let index
  let list
  let cardIndex
  switch (action.type) {
    case ADD_CARD:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.id === action.listId)
      newColumnList[index].cards.push(action.card)
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case EDIT_CARD:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.id === action.listId)
      cardIndex = newColumnList[index].cards.findIndex(x => x.id === action.card.id)
      newColumnList[index].cards[cardIndex] = action.card
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case DELETE_CARD:
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.id === action.listId)
      cardIndex = newColumnList[index].cards.findIndex(x => x.id === action.cardId)
      newColumnList[index].cards.splice(cardIndex, 1)
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case ADD_LIST:
      newColumnList = [...state.columnList]
      list = {
        name: action.name,
        cards: []
      }
      newColumnList.push(list)
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
    case ADD_BOARD:
      return Object.assign(
        {},
        state, {

        });
    case DELETE_BOARD:
      return Object.assign(
        {},
        state, {

        });
    default:
      return state
  }
}
