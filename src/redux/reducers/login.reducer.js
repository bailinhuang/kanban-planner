import uuid from 'uuid'

const initialState = {
  loggedIn: false
}

const LOGOUT = "LOGOUT"
const LOGIN = "LOGIN"

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign(
        {},
        state, {
          loggedIn: true
        });
    case LOGOUT:
      return Object.assign(
        {},
        state, {
          loggedIn: false
        });
    default:
      return state
  }
}
