import uuid from 'uuid'

const initialState = {
  columnList: [{
    name: 'patito', cards: [{ id: uuid(), name: 'hello', details: 'hola' },
    { id: uuid(), name: 'hello', details: 'hola' }]}],

    board: [{
      name: "Board 1", columnList: [{
        name: 'patito', cards: [{ id: uuid(), name: 'hello', details: 'hola' },
        { id: uuid(), name: 'hello', details: 'hola' }]
      }]
    }]
  }


const ADD_CARD = "ADD_CARD"
const DELETE_CARD = "DELETE_CARD"
const ADD_LIST = "ADD_LIST"
const DELETE_LIST = "DELETE_LIST"
const ADD_BOARD = "ADD_BOARD"
const DELETE_BOARD = "DELETE_BOARD"

export default function (state = initialState, action) {
  let newColumnList
  let index
  let list
  switch (action.type) {
    case ADD_CARD:

      let card = {
        id: uuid(),
        name: action.name,
        details: action.details
      }
      newColumnList = [...state.columnList]
      index = newColumnList.findIndex(x => x.name === action.listName)
      newColumnList[index].cards.push(card)
      return Object.assign(
        {},
        state, {
          columnList: newColumnList
        });
    case DELETE_CARD:
      return Object.assign(
        {},
        state, {

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
