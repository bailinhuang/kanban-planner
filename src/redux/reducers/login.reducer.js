const initialState = {
  loggedIn: false,
  googleLogin: false,
  username: '', 
  users: ['']
}

const LOGOUT = 'LOGOUT'
const LOGIN = 'LOGIN'

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      if(!state.users.includes(action.username)){
        state.users.push(action.username)
      }
      return Object.assign(
        {},
        state, {
          googleLogin: action.loginType,
          username: action.username,
          loggedIn: true
        });
    case LOGOUT:
      return Object.assign(
        {},
        state, {
          username: '',
          loggedIn: false
        });
    default:
      return state
  }
}
